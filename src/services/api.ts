// Dharam Futurebit Computer Academy API Client

export interface RazorpayOrderResponse {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  keyId?: string;
  isLive?: boolean;
  message?: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  verified: boolean;
  paymentId: string;
  orderId: string;
  mode?: string;
}

export interface AdmissionPayload {
  studentName: string;
  fatherName: string;
  phone: string;
  whatsapp?: string;
  address: string;
  courseId: string;
  courseTitle: string;
  batchTime: string;
  paymentOption: 'full' | 'installment' | 'center';
  amountPaid: number;
  paymentMethod: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
}

export interface AdmissionResponse {
  success: boolean;
  admission: {
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
    paymentOption: string;
    amountPaid: number;
    paymentMethod: string;
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
    date: string;
    status: string;
  };
  receipt: {
    admissionNo: string;
    rollNo: string;
    date: string;
    amountPaid: number;
    paymentId: string;
    paymentStatus: string;
  };
}

export const api = {
  // Get Razorpay Configuration
  async getPaymentConfig() {
    try {
      const res = await fetch('/api/payment/config');
      if (!res.ok) throw new Error('Failed to fetch config');
      return await res.json();
    } catch (err) {
      console.warn('Config fetch fallback:', err);
      return {
        keyId: 'rzp_test_fallback_dharam',
        isLiveConfigured: false,
        currency: 'INR',
        merchantName: 'Dharam Futurebit Computer Academy',
      };
    }
  },

  // Create Razorpay Order
  async createPaymentOrder(data: {
    amount: number;
    studentName?: string;
    courseTitle?: string;
    receipt?: string;
    notes?: Record<string, string>;
  }): Promise<RazorpayOrderResponse> {
    const res = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create order');
    }
    return await res.json();
  },

  // Verify Razorpay Payment Signature
  async verifyPayment(data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<PaymentVerifyResponse> {
    const res = await fetch('/api/payment/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Payment signature verification failed');
    }
    return await res.json();
  },

  // Register New Student Admission
  async registerAdmission(payload: AdmissionPayload): Promise<AdmissionResponse> {
    const res = await fetch('/api/admissions/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to register admission');
    }
    return await res.json();
  },

  // Fetch all registered admissions
  async getAdmissions() {
    const res = await fetch('/api/admissions');
    if (!res.ok) throw new Error('Failed to fetch admissions');
    return await res.json();
  },
};

/**
 * Helper to open Razorpay Checkout with fallback handling
 */
export async function openRazorpayCheckout(options: {
  amount: number;
  studentName: string;
  email?: string;
  phone: string;
  description: string;
  courseTitle: string;
  onSuccess: (paymentId: string, orderId: string) => void;
  onError: (errorMsg: string) => void;
}) {
  try {
    const orderData = await api.createPaymentOrder({
      amount: options.amount,
      studentName: options.studentName,
      courseTitle: options.courseTitle,
      receipt: `adm_rcpt_${Date.now()}`,
    });

    const keyId = orderData.keyId || 'rzp_test_fallback_dharam';

    // If window.Razorpay is available (loaded via checkout.js)
    if (typeof (window as any).Razorpay !== 'undefined') {
      const rzp = new (window as any).Razorpay({
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Dharam Futurebit Computer Academy',
        description: options.description,
        order_id: orderData.orderId.startsWith('order_sim_') ? undefined : orderData.orderId,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
        prefill: {
          name: options.studentName,
          email: options.email || 'student@dharamfuturebit.com',
          contact: options.phone || '9625118781',
        },
        theme: {
          color: '#1a73e8',
        },
        handler: async function (response: any) {
          try {
            await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id || orderData.orderId,
              razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
              razorpay_signature: response.razorpay_signature || 'sandbox_sig',
            });
            options.onSuccess(
              response.razorpay_payment_id || `pay_${Date.now()}`,
              response.razorpay_order_id || orderData.orderId
            );
          } catch (err: any) {
            options.onError(err.message || 'Signature verification failed');
          }
        },
        modal: {
          ondismiss: function () {
            options.onError('Payment modal was closed by user');
          },
        },
      });

      rzp.on('payment.failed', function (resp: any) {
        options.onError(resp.error?.description || 'Payment Failed');
      });

      rzp.open();
    } else {
      // Fallback sandbox simulation if Razorpay JS SDK isn't loaded (e.g. offline/iframe network block)
      const simulatedPaymentId = `pay_rzp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      await api.verifyPayment({
        razorpay_order_id: orderData.orderId,
        razorpay_payment_id: simulatedPaymentId,
        razorpay_signature: 'sandbox_verified_signature',
      });
      options.onSuccess(simulatedPaymentId, orderData.orderId);
    }
  } catch (err: any) {
    options.onError(err.message || 'Could not initiate Razorpay payment');
  }
}
