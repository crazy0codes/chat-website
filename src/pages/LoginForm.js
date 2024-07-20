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


export function LoginForm({props}) {
    let {setToken} = props
    async function handleLogin() {
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        let jwtToken = localStorage.getItem('token') || null;
        const URL = process.env.REACT_APP_URL;
        const data = await fetch(`${URL}/login?email=${email}@sves.org.in&password=${password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken ? `Bearer ${jwtToken}` : null
            },
        });
        if(data.status == 200){
            const jsonData = await data.json();
            const {validUser} = jsonData
            localStorage.setItem('token',jsonData.token);
            localStorage.setItem('stu_email',jsonData.username);
            setToken(validUser)
        }
        else{
            console.log("SERVER CONNECTION => ERROR")
        }
    }

    return (
        <div className="h-screen flex">
            <Card className="mx-auto my-auto max-w-sm ">
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
                        <Button type="submit" className="w-full" onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
