'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type ContactFormProps = {
  locale: string;
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
};

export const ContactForm = ({ locale, labels }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>();

  const handleContactSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setRequestStatus('idle');

    const parseResult = contactSchema.safeParse(values);
    if (!parseResult.success) {
      setIsSubmitting(false);
      setRequestStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parseResult.data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setRequestStatus('success');
      reset();
    } catch {
      setRequestStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleContactSubmit)} className="space-y-5 border border-brand-black/10 bg-white p-6 md:p-8">
      <div className="space-y-2">
        <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-brand-black">
          {labels.name}
        </label>
        <input
          id="name"
          type="text"
          className="w-full border border-brand-black/20 px-4 py-3 font-sans text-sm text-brand-black outline-none transition focus:border-brand-red"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', { required: true })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-brand-black">
          {labels.email}
        </label>
        <input
          id="email"
          type="email"
          className="w-full border border-brand-black/20 px-4 py-3 font-sans text-sm text-brand-black outline-none transition focus:border-brand-red"
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: true })}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-brand-black">
          {labels.message}
        </label>
        <textarea
          id="message"
          rows={6}
          className="w-full border border-brand-black/20 px-4 py-3 font-sans text-sm text-brand-black outline-none transition focus:border-brand-red"
          aria-invalid={errors.message ? 'true' : 'false'}
          {...register('message', { required: true, minLength: 10 })}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-red px-6 py-3 font-sans text-sm uppercase tracking-widest text-white transition hover:bg-brand-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? `${labels.submit}...` : labels.submit}
      </button>

      {requestStatus === 'success' ? <p className="font-sans text-sm text-brand-green">{labels.success}</p> : null}
      {requestStatus === 'error' ? <p className="font-sans text-sm text-brand-red">{labels.error}</p> : null}
      {locale === 'fr' && errors.message ? (
        <p className="font-sans text-xs text-brand-red">Le message doit contenir au moins 10 caractères.</p>
      ) : null}
      {locale === 'en' && errors.message ? (
        <p className="font-sans text-xs text-brand-red">Message must be at least 10 characters long.</p>
      ) : null}
    </form>
  );
};
