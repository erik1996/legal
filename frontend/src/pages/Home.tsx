import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Role = { id: number; name: string };
type Country = { code: string; name: string };
type QuestionOption = { id: number; option: string; questionId: number };
type Question = {
  id: number;
  question: string;
  options: QuestionOption[];
};

type AnswerMap = {
  [questionId: number]: number; // question.id -> selected option.id
};

const translations: Record<string, Record<string, string>> = {
  cym: {
    name: "Name",
    role: "Role",
    country: "Country",
    language: "Language",
    createTopic: "Create Topic",
    continue: "Continue",
  },
  arm: {
    name: "Անուն",
    role: "Դեր",
    country: "Երկիր",
    language: "Լեզու",
    createTopic: "Ստեղծել հարցում",
    continue: "Շարունակել",
  },
  rus: {
    name: "Имя",
    role: "Роль",
    country: "Страна",
    language: "Язык",
    createTopic: "Создать запрос",
    continue: "Продолжить",
  },
  ara: {
    name: "الاسم",
    role: "الدور",
    country: "البلد",
    language: "اللغة",
    createTopic: "إنشاء استفسار",
    continue: "استمرار",
  },
};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultLang = searchParams.get("lang") || "cym";
  const [lang, setLang] = useState(defaultLang);
  const [roles, setRoles] = useState<Role[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<number | "">("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const API_HOST = import.meta.env.VITE_API_HOST;

  useEffect(() => {
    const load = async () => {
      setName("");
      setRoles([]);
      setSelectedRole("");
      setSelectedCountry("");
      setAnswers({});

      const [rolesRes, countriesRes, questionsRes] = await Promise.all([
        axios.get(`${API_HOST}/role?lang=${lang}`),
        axios.get(`${API_HOST}/countries?lang=${lang}`),
        axios.get(`${API_HOST}/questions?lang=${lang}`),
      ]);
      setRoles(rolesRes.data);
      setCountries(countriesRes.data);
      setQuestions(questionsRes.data);
    };

    load();
  }, [API_HOST, lang]);

  const handleSelectAnswer = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    const questionAnswerMap = Object.entries(answers).map(
      ([questionId, answerId]) => ({
        questionId: Number(questionId),
        answerId: Number(answerId),
      })
    );

    const payload = {
      name,
      country: selectedCountry,
      roleId: selectedRole,
      questionAnswerMap,
    };

    axios
      .post(`${API_HOST}/topic`, payload)
      .then((res) => {
        const topicId = res.data.id; // adjust if your API returns it under a different key
        navigate(`/message/${topicId}?lang=${lang}`);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create topic.");
      });
  };

  const isSubmitDisabled =
    !name ||
    !selectedRole ||
    !selectedCountry ||
    Object.keys(answers).length !== questions.length;
  const translations: Record<string, Record<string, string>> = {
    cym: {
      name: "Name",
      role: "Role",
      country: "Country",
      language: "Language",
      createTopic: "Create Topic",
      continue: "Continue",
    },
    arm: {
      name: "Անուն",
      role: "Դեր",
      country: "Երկիր",
      language: "Լեզու",
      createTopic: "Ստեղծել հարցում",
      continue: "Շարունակել",
    },
    rus: {
      name: "Имя",
      role: "Роль",
      country: "Страна",
      language: "Язык",
      createTopic: "Создать запрос",
      continue: "Продолжить",
    },
    ara: {
      name: "الاسم",
      role: "الدور",
      country: "البلد",
      language: "اللغة",
      createTopic: "إنشاء استفسار",
      continue: "استمرار",
    },
  };
  const t = translations[lang] || translations.cym;
  return (
    <Box mx="auto" display="flex" flexDirection="column" gap={3}>
      <TextField
        label={t.language}
        select
        fullWidth
        value={lang}
        onChange={(e) => {
          const newLang = e.target.value;
          setLang(newLang);
          const params = new URLSearchParams(location.search);
          params.set("lang", newLang);
          navigate(`${location.pathname}?${params.toString()}`);
        }}
      >
        <MenuItem value="cym">English</MenuItem>
        <MenuItem value="arm">Հայերեն</MenuItem>
        <MenuItem value="rus">Русский</MenuItem>
        <MenuItem value="ara">العربية</MenuItem>
      </TextField>

      <Typography variant="h5">{t.createTopic}</Typography>

      <TextField
        label={t.name}
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label={t.role}
        select
        fullWidth
        value={selectedRole}
        onChange={(e) => setSelectedRole(Number(e.target.value))}
      >
        {roles.map((role) => (
          <MenuItem key={role.id} value={role.id}>
            {role.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label={t.country}
        select
        fullWidth
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.name}
          </MenuItem>
        ))}
      </TextField>

      {questions.length === 0 ? (
        <CircularProgress />
      ) : (
        questions.map((q) => (
          <TextField
            key={q.id}
            label={q.question}
            select
            fullWidth
            value={answers[q.id] || ""}
            onChange={(e) => handleSelectAnswer(q.id, Number(e.target.value))}
          >
            {q.options.map((opt) => (
              <MenuItem key={opt.id} value={opt.id}>
                {opt.option}
              </MenuItem>
            ))}
          </TextField>
        ))
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Continue
      </Button>
    </Box>
  );
}
