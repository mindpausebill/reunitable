export const redirectToCustomerPortal = async (returnUrl?: string) => {
  try {
    const response = await fetch(`/api/stripe/CreateStripePortalLink`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ returnUrl }),
      credentials: 'same-origin'
    });

    if (response?.ok) {
      const { url } = await response.json();
      window.location.assign(url);
    } else {
      throw Error(response?.statusText);
    }
  } catch (e) {
    console.log(e);
  }
};
