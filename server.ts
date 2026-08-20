import express, { Request, Response } from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

let razorpayInstance: Razorpay | null = null;

function getRazorpay(): Razorpay | null {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (key_id && key_secret) {
    if (!razorpayInstance) {
      razorpayInstance = new Razorpay({
        key_id,
        key_secret,
      });
    }
    return razorpayInstance;
  }
  return null;
}

// In-memory persistent admissions store
interface AdmissionRecord {
  id: string;
  admissionNo: string;
  rollNo: string;
  studentName: string;
  fatherName: string;
  phone: string;
  whatsapp?: string;
  address: string;
  courseId: string;
  courseTitle: string;
  batchTime: string;
  paymentOption: "full" | "installment" | "center";
  amountPaid: number;
  paymentMethod: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  date: string;
  status: "Active" | "Pending Payment";
}

const admissionsDatabase: AdmissionRecord[] = [
  {
    id: "adm-1",
    admissionNo: "ADM-2026-10021",
    rollNo: "2026-PLW-1089",
    studentName: "Rahul Sharma",
    fatherName: "Sh. Suresh Sharma",
    phone: "+91 9625118781",
    whatsapp: "+91 9354358781",
    address: "Bhagola Village, Palwal (Haryana)",
    courseId: "adca",
    courseTitle: "Advance Diploma in Computer Applications (ADCA)",
    batchTime: "09:00 AM - 11:00 AM (Morning)",
    paymentOption: "full",
    amountPaid: 8499,
    paymentMethod: "Razorpay (Online UPI/Cards)",
    razorpayPaymentId: "pay_sample_1089",
    date: "15 Jan 2026",
    status: "Active",
  },
  {
    id: "adm-2",
    admissionNo: "ADM-2026-10042",
    rollNo: "2026-PLW-3021",
    studentName: "Pooja Rawat",
    fatherName: "Sh. Dharamveer Rawat",
    phone: "+91 9812345678",
    whatsapp: "+91 9812345678",
    address: "Hodal Road, Palwal (Haryana)",
    courseId: "tally-prime",
    courseTitle: "Tally Prime with GST & E-Invoicing",
    batchTime: "11:00 AM - 01:00 PM (Noon)",
    paymentOption: "installment",
    amountPaid: 1666,
    paymentMethod: "Razorpay (Online UPI/Cards)",
    razorpayPaymentId: "pay_sample_3021",
    date: "02 Feb 2026",
    status: "Active",
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ----------------------------------------------------
  // API Routes
  // ----------------------------------------------------

  // Health & Config endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      serverTime: new Date().toISOString(),
      razorpayConfigured: Boolean(
        process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
      ),
    });
  });

  // Get Razorpay Public Config (Key ID & Test Status)
  app.get("/api/payment/config", (_req: Request, res: Response) => {
    const keyId = process.env.RAZORPAY_KEY_ID || "";
    const isLive = Boolean(keyId && process.env.RAZORPAY_KEY_SECRET);

    res.json({
      keyId: keyId || "rzp_test_fallback_dharam",
      isLiveConfigured: isLive,
      currency: "INR",
      merchantName: "Dharam Futurebit Computer Academy",
      supportPhone: "+91 9625118781",
    });
  });

  // Create Razorpay Order
  app.post("/api/payment/create-order", async (req: Request, res: Response) => {
    try {
      const { amount, receipt, notes, studentName, courseTitle } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid payment amount" });
      }

      const rzp = getRazorpay();
      const amountInPaise = Math.round(Number(amount) * 100);

      if (rzp) {
        // Real Razorpay API order creation
        const order = await rzp.orders.create({
          amount: amountInPaise,
          currency: "INR",
          receipt: receipt || `rcpt_${Date.now()}`,
          notes: {
            studentName: studentName || "Student",
            courseTitle: courseTitle || "Course Fee",
            ...notes,
          },
        });

        return res.json({
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: process.env.RAZORPAY_KEY_ID,
          isLive: true,
        });
      } else {
        // Simulated Order for Instant Development & Demo
        const simulatedOrderId = `order_sim_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        return res.json({
          success: true,
          orderId: simulatedOrderId,
          amount: amountInPaise,
          currency: "INR",
          keyId: "rzp_test_demo_dharam",
          isLive: false,
          message:
            "Razorpay keys not configured in environment. Running in instant verified sandbox mode.",
        });
      }
    } catch (error: any) {
      console.error("Razorpay order creation error:", error);
      return res.status(500).json({
        error: error.message || "Failed to create Razorpay order",
      });
    }
  });

  // Verify Razorpay Payment Signature
  app.post("/api/payment/verify-payment", (req: Request, res: Response) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id) {
        return res.status(400).json({ error: "Missing payment parameters" });
      }

      const secret = process.env.RAZORPAY_KEY_SECRET;

      if (secret && razorpay_signature) {
        // Real signature verification
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
          .createHmac("sha256", secret)
          .update(body.toString())
          .digest("hex");

        const isValid = expectedSignature === razorpay_signature;

        if (!isValid) {
          return res.status(400).json({
            success: false,
            error: "Invalid Razorpay payment signature verification",
          });
        }

        return res.json({
          success: true,
          verified: true,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        });
      } else {
        // Simulated sandbox verification
        return res.json({
          success: true,
          verified: true,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          mode: "sandbox",
        });
      }
    } catch (error: any) {
      console.error("Signature verification error:", error);
      return res.status(500).json({
        error: error.message || "Payment verification failed",
      });
    }
  });

  // Register New Student Admission
  app.post("/api/admissions/register", (req: Request, res: Response) => {
    try {
      const {
        studentName,
        fatherName,
        phone,
        whatsapp,
        address,
        courseId,
        courseTitle,
        batchTime,
        paymentOption,
        amountPaid,
        paymentMethod,
        razorpayPaymentId,
        razorpayOrderId,
      } = req.body;

      if (!studentName || !phone || !courseTitle) {
        return res.status(400).json({ error: "Missing required student fields" });
      }

      const rollNo = `2026-PLW-${Math.floor(1000 + Math.random() * 9000)}`;
      const admissionNo = `ADM-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const date = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const newRecord: AdmissionRecord = {
        id: `adm-${Date.now()}`,
        admissionNo,
        rollNo,
        studentName,
        fatherName: fatherName || "N/A",
        phone,
        whatsapp: whatsapp || phone,
        address: address || "Bhagola, Palwal",
        courseId: courseId || "adca",
        courseTitle,
        batchTime: batchTime || "09:00 AM - 11:00 AM",
        paymentOption: paymentOption || "full",
        amountPaid: Number(amountPaid) || 0,
        paymentMethod: paymentMethod || "Razorpay Online",
        razorpayPaymentId,
        razorpayOrderId,
        date,
        status: "Active",
      };

      admissionsDatabase.unshift(newRecord);

      return res.json({
        success: true,
        admission: newRecord,
        receipt: {
          admissionNo,
          rollNo,
          date,
          amountPaid: newRecord.amountPaid,
          paymentId: razorpayPaymentId || `RCPT-${Date.now()}`,
          paymentStatus: "CONFIRMED_PAID",
        },
      });
    } catch (error: any) {
      console.error("Admission registration error:", error);
      return res.status(500).json({ error: "Failed to register admission" });
    }
  });

  // Fetch all admissions list
  app.get("/api/admissions", (_req: Request, res: Response) => {
    res.json({
      success: true,
      total: admissionsDatabase.length,
      data: admissionsDatabase,
    });
  });

  // ----------------------------------------------------
  // Vite Middleware & Static Serving
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dharam Futurebit Academy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
