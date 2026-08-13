export function checkPasswordStrength(password: string) {
  const checks = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
  };

  const passed = Object.values(checks).filter(Boolean).length;

  return {
    ...checks,
    isValid: checks.minLength && checks.hasUpper && checks.hasLower,
    score: passed,
  };
}
