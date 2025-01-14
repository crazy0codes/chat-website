import { useState } from "react"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Loader2 } from "lucide-react"


export function LoginForm({ props: setUser }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  async function handleLogin(e) {
    e.preventDefault();
    let email = document.querySelector('#email').value.trim();
    let password = document.querySelector('#password').value.trim();
    const jwtToken = localStorage.getItem('token') || null;
    const URL = process.env.REACT_APP_URL;
    const API = `${URL}/login?email=${email}@sves.org.in&password=${password}`;

    try {
      setLoading(true);
      const response = await fetch(API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken ? `Bearer ${jwtToken}` : null
        },
      });

      if (response.ok) {
        const { username, token } = await response.json();
        let stu_email = username;
        localStorage.setItem('token', token);
        localStorage.setItem('stu_email', stu_email);
        setUser({ stu_email, token });
      }
    }

    catch (error) {
      setError(() => {
        setTimeout(() => { setError(false) }, 5000);
        return error
      });
    }

    finally {
      setLoading(false);
    }
  }


  return (
    <>
      <div className="h-screen flex">
        <Card className="mx-auto my-auto max-w-sm relative">
          {error && <p className="bg-red-500 p-4 w-full absolute top-[-80px] text-white rounded"> Error invalid password or email</p>}
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button disabled={loading} type="submit" className="w-full" onClick={handleLogin}>
                {loading ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  loading...
                </> : "login"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}