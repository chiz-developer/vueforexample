export default function ({ $auth, redirect, app }) {
  if (!$auth.loggedIn) {
      return redirect('/signin');
  }
}