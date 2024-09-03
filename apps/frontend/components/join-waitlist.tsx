"use client";
import { FormEvent, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { addEmail } from "@/actions/email-submit";

const JoinWaitlist = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const res = await addEmail(email);
  };

  return (
    <div className="flex flex-col items-center justify-evenly ">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">WELCOME TO SOL SCISSORS STONE</h1>
        <h2 className="text-xl font-thin">
          PLAY ROCK PAPER SCISSORS AND EARN SOL
        </h2>
      </div>
      <Card className="w-full max-w-md p-4 dark:bg-gray-800 dark:border-gray-700 ">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            LAUNCHING SOON<br></br>{" "}
            <span className="font-thin"> Join the Waitlist</span>
          </h2>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 bg-white dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Join Waitlist
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Thank you for joining the waitlist!
              </h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                We&aposll keep you updated with the latest news.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center justify-center text-sm text-gray-500 dark:text-gray-400">
          We respect your privacy. Unsubscribe at any time.
        </CardFooter>
      </Card>
    </div>
  );
};

export default JoinWaitlist;
