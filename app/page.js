"use client";
import { createSvgIcon } from "@mui/material/utils";

import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import React, { useEffect, useRef } from "react";

import { Analytics } from "@vercel/analytics/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ReactMarkdown from "react-markdown";

import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Divider,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the HeadStarter support assistant. How can I help you?`,
    },
  ]);

  const sendMessage = async () => {
    setUserMessage("");
    setMessage((message) => [
      ...message,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ...message,
        { role: "user", content: userMessage },
      ]),
    }).then((res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        setMessage((message) => {
          let lastMessage = message[message.length - 1];

          let otherMessage = message.slice(0, message.length - 1);

          return [
            ...otherMessage,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });

        return reader.read().then(processText);
      });
    });
  };
  const [userMessage, setUserMessage] = useState("");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffffff", // white color
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          overflow="hidden"
        >
          <Navbar />
          <Main
            handleSend={sendMessage}
            handleInput={(e) => {
              setUserMessage(e.target.value);
            }}
            InputValue={userMessage}
            messageData={message}
          />
        </Box>
      </ThemeProvider>

      <Analytics />
    </>
  );
}

function Navbar() {
  return (
    <Box
      width="100%"
      height="3.5rem"
      bgcolor="#000"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingInline={5}
      sx={{
        "@media (max-width: 600px)": {
          paddingInline: 2,
        },
      }}
      position="fixed"
    >
      <Typography variant="h5" noWrap>
        HeadStarter
      </Typography>

      <Button variant="contained" color="primary">
        Log in
      </Button>
    </Box>
  );
}

function Main({ handleSend, handleInput, InputValue, messageData }) {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      width={isMobile ? "100%" : "50%"}
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="3.5rem"
      padding={isMobile ? 2 : 0}
    >
      <ResultBox message={messageData} />
      <InputBox
        handleSend={handleSend}
        handleInput={handleInput}
        InputValue={InputValue}
      />
    </Box>
  );
}

function ResultBox({ message }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Stack
      width="100%"
      height="80%"
      marginBottom={3}
      display="flex"
      flexDirection="column"
      paddingTop={3}
      overflow="scroll"
      style={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {message.map((message, index) => (
        <Box key={index} width="100%" display="flex" flexDirection="column">
          {index === 0 ? "" : <Divider variant="middle" />}
          <Box
            width="100%"
            display="flex"
            justifyContent={
              message.role === "assistant" ? "flex-start" : "flex-end"
            }
            p={3}
          >
            <Box
              width="70%"
              height="100%"
              color="white"
              display="flex"
              flexDirection="column"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
              textAlign={message.role === "user" ? "right" : "left"}
              borderRadius={2}
              paddingRight={3}
            >
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {message.content}
              </ReactMarkdown>
            </Box>
          </Box>
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Stack>
  );
}

function InputBox({ handleSend, handleInput, InputValue }) {
  const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>,
    "Plus"
  );

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      width="100%"
      height="20%"
      borderRadius={2}
      bgcolor="#000"
      p={isMobile ? 1 : 2}
    >
      <Box
        width="100%"
        height={isMobile ? "100%" : "70%"}
        border="1px solid #333333"
        borderRadius={1}
        display="flex"
        alignItems="center"
        paddingX={2}
        sx={{
          flexDirection: isMobile ? "column" : "row",
          paddingX: isMobile ? 1 : 2,
        }}
      >
        <Box
          border="1px solid #333333"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={0.5}
          marginRight={isMobile ? 0 : 1}
          marginBottom={isMobile ? 1 : 0}
        >
          <PlusIcon />
        </Box>
        <TextField
          label="Send a message"
          variant="outlined"
          size="small"
          fullWidth
          value={InputValue}
          onChange={handleInput}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginLeft: isMobile ? 0 : "1rem",
            marginTop: isMobile ? "1rem" : 0,
          }}
          onClick={handleSend}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
