'use client'

import { Icons } from "@/components/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { ZodError } from "zod"


const Page = () => {
            
    const router = useRouter()
    const {
        register, 
        handleSubmit, 
        formState:{errors},
    } = useForm<TAuthCredentialsValidator>({
        resolver:zodResolver(AuthCredentialsValidator),
    })
    const { mutate, isLoading } = trpc.auth.createPayLoadUser.useMutation({
        onError:(err)=>{
            if(err.data?.code === "CONFLICT"){
                toast.error('An account alredy exists with the same email. Sign in instead?')
                return
            }
            if(err instanceof ZodError){
                toast.error(err.issues[0].message)
                return
            }

            toast.error('Something went wrong please try again.')
        },
        onSuccess:({sentToEmail})=>{
            toast.success(`Verification email sent to ${sentToEmail}.`)
            router.push('/verify-email?to='+sentToEmail)
        }
    })

    // console.log(data)

    const onSubmit = ({
        email,
        password}:
        TAuthCredentialsValidator) =>{
        mutate({email, password})
            
    }

    return <>
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 ">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Icons.logo className="h-20 w-20" />
                    <h1 className="text-2xl font-bold">
                        Sign in to your account
                    </h1>
                    <Link className={buttonVariants({
                        variant: 'link',
                        className: 'gap-1.5',
                    })} href='/sign-up'>
                        Don&apos;t have an acount? Sign-up
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid gap-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                {...register('email')}
                                className={cn({"focus-visible:ring-red-500" : errors.email})} 
                                placeholder="you@example.com"
                                />
                                {errors?.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                 )}
                            </div>
                            <div className="grid gap-1 py-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                type="password"
                                {...register('password')}                                
                                className={cn({"focus-visible:ring-red-500" : errors.password})} 
                                placeholder="Password"
                                />
                                {errors?.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                 )}
                            </div>
                            <Button>Sign in</Button>
                        </div>
                    </form>
                    <div className="relative">
                        <div 
                        aria-hidden='true'
                        className="absolute inset-0 flex items-center"
                        >   
                        <span className="w-full border-t" />
                        </div>
                        <div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    or
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Page