import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

type Message = {
  sender: "user" | "ai";
  content: string;
};

export default function Messenger() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const API_HOST = import.meta.env.VITE_API_HOST;

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg: Message = { sender: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_HOST}/claude/ask`, {
        topicId,
        question: message,
      });

      const aiMsg: Message = {
        sender: "ai",
        content: res.data.response || "No response received.",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={0}
      className="sfsd"
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Button onClick={() => navigate(-1)} variant="text">
          Back
        </Button>
        <Typography variant="h6" ml={2}>
          Messenger
        </Typography>
      </Box>
      <Box
        flexGrow={1}
        overflow="auto"
        display="flex"
        flexDirection="column"
        gap={2}
        px={1}
        mb={2}
      >
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
            bgcolor={msg.sender === "user" ? "primary.main" : "grey.100"}
            color={msg.sender === "user" ? "white" : "black"}
            px={2}
            py={1}
            borderRadius={2}
            maxWidth="85%"
            width="fit-content"
            sx={{ wordBreak: "break-word" }}
          >
            {msg.sender === "ai" ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              <Typography variant="body2">{msg.content}</Typography>
            )}
          </Box>
        ))}
        {loading && <CircularProgress size={20} />}
        <div ref={scrollRef} />
      </Box>
      <Box display="flex" flexDirection="column" gap={1}>
        <TextField
          label="Type your message..."
          multiline
          minRows={3}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            border: "1px solid #ccc",
          }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={!message.trim() || loading}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
