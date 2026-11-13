/* =============================================================================
   Ear Responsible — site config
   Every Buy button reads stripePaymentLink.
   The contact form posts to formspreeEndpoint only when that value is a real
   Formspree URL. While it still contains PLACEHOLDER, submitting the form
   opens the visitor's email app (mailto:earresponsiblehalifax@gmail.com).
   ============================================================================= */

window.EAR_RESPONSIBLE = {
  /* Live Stripe Payment Link: Earplugs, $20 CAD. Shipping and HST are added on Stripe. */
  stripePaymentLink: "https://buy.stripe.com/9B6bJ2b3gdgSeiNeOy3F600",

  /* Replace with a real Formspree endpoint, e.g. "https://formspree.io/f/abcdxyz". */
  formspreeEndpoint: "https://formspree.io/f/PLACEHOLDER"
};
