import * as React from "react"
import { Send } from "lucide-react"
import MyIcon from "../../../assets/aiicon.png";

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";

export function CardsChat({sessionId,resumeId,isProfileView}:{sessionId: string,resumeId:Id<"resumes">, isProfileView: boolean}) {
 
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length
  const messages = useQuery(api.chat.listMessages, {sessionId})
  const sendMessage = useMutation(api.chat.chatWithResume)
  return (
      <Card className="mt-[110px] mx-10 w-[100%]">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={MyIcon} alt="Image" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Chat with Ananth Resume</p>
              <p className="text-sm text-muted-foreground">Message on 24/02/2011</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
        <div className={`flex flex-col-reverse space-y-4 h-[61vh] overflow-y-scroll scrollbar-hidden grow overflow-hidden`}>
            {messages && messages.toReversed().map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max-[100%] max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.type === "human"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.message}
              </div>
            ))}
          </div>
        </CardContent>
        {!isProfileView && (
            <CardFooter>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (inputLength === 0) return
                sendMessage({sessionId,resumeId, message: input})
                setInput("")
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                id="message"
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <Button type="submit" size="icon" disabled={inputLength === 0}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        )}
      </Card>
  )
}
