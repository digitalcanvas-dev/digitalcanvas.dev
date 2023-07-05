const ReCaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';
export const validateCaptcha = async (
  recaptchaValue: FormDataEntryValue | null,
) => {
  const captchaResponse = await fetch(ReCaptchaURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.CAPTCHA_SECRET}&response=${recaptchaValue}`,
  });

  return await captchaResponse.json();
};
