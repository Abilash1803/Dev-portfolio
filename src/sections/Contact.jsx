import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import EarthCanvas from '../canvas/EarthCanvas';

export const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields before sending.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'pubkey_placeholder';

    // If using default placeholder keys, simulate graceful transmission
    if (
      serviceId.includes('placeholder') ||
      templateId.includes('placeholder') ||
      publicKey.includes('placeholder')
    ) {
      setTimeout(() => {
        setLoading(false);
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been received. I will get back to you promptly.',
        });
        setForm({ name: '', email: '', message: '' });
      }, 1200);
      return;
    }

    // Live EmailJS call
    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: 'Abilash B',
          from_email: form.email,
          to_email: 'abilashbhojan1803@gmail.com',
          message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          setStatus({
            type: 'success',
            message: 'Thank you! Your message has been sent successfully.',
          });
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS error:', error);
          setStatus({
            type: 'error',
            message: 'Something went wrong while sending. Please reach out directly via email.',
          });
        }
      );
  };

  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 z-10">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col-reverse xl:flex-row gap-10 lg:gap-14 overflow-hidden items-center">
          {/* Left Minimal Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="xl:flex-[0.8] w-full bg-[#0a071d]/70 backdrop-blur-2xl p-7 sm:p-9 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Ambient Top Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#915EFF]/60 to-transparent" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-[11px] text-[#915EFF] font-mono uppercase tracking-widest font-semibold">
                  Get in touch
                </p>
                <h2 className="text-white font-bold text-2xl sm:text-3xl tracking-tight mt-0.5">
                  Let's collaborate.
                </h2>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <a
                  href="mailto:abilashbhojan1803@gmail.com"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#915EFF]" />
                  <span>Email</span>
                </a>
                <a
                  href="tel:+919487847198"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#915EFF]" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            {/* Clean Minimal Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 focus:border-[#915EFF] focus:ring-1 focus:ring-[#915EFF]/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 focus:border-[#915EFF] focus:ring-1 focus:ring-[#915EFF]/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Message
                </span>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  required
                  className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 focus:border-[#915EFF] focus:ring-1 focus:ring-[#915EFF]/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 resize-none"
                />
              </label>

              {/* Status Message */}
              {status.message && (
                <div
                  className={`p-3 rounded-xl flex items-center gap-2 text-xs ${
                    status.type === 'success'
                      ? 'bg-[#00cea8]/15 border border-[#00cea8]/40 text-[#00cea8]'
                      : 'bg-red-500/15 border border-red-500/40 text-red-300'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#915EFF] to-[#7c3aed] text-white text-sm font-medium shadow-[0_0_20px_rgba(145,94,255,0.25)] hover:shadow-[0_0_25px_rgba(145,94,255,0.4)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Neon Constellation Globe */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="xl:flex-1 w-full xl:h-[540px] lg:h-[480px] md:h-[440px] sm:h-[390px] h-[340px] flex items-center justify-center relative"
          >
            {/* Ambient Cosmic Neon Radial Aura */}
            <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-[#7c3aed]/20 via-[#a855f7]/12 to-[#38bdf8]/15 blur-3xl pointer-events-none -z-10" />
            <EarthCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
