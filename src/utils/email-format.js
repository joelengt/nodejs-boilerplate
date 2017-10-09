
export function isValidEmail (email) {
  let isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)
  if (!isValid) return false
  let emailCompanyFormat = email.split('@')[1].split('.')[0]
  if (emailCompanyFormat !== 'tekton') return false
  return true
}
