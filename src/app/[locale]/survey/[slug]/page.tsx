"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { useSurvey_showQuery } from "@/services/menteenoApi.generated";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SurveyPage() {
  return <SurveyContent />;
}

function SurveyContent() {
  const { t } = useTranslation();
  const params = useParams();
  const slug = params.slug as string;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const {
    data: surveyData,
    isLoading: surveyLoading,
    error: surveyError,
  } = useSurvey_showQuery({
    path: { survey: slug },
  });

  const survey = surveyData;

  if (surveyLoading) {
    return <SurveySkeleton />;
  }

  if (surveyError || !survey) {
    return <SurveyError />;
  }

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < (survey.questions?.length || 0) - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Submit survey responses
    console.log("Submitting survey responses:", answers);
  };

  const questions = survey?.questions || [];
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${params.locale}/dashboard`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("survey.back_to_dashboard")}
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{survey.title}</h1>
          </div>

          {/* Survey Info */}
          <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t("survey.created")}{" "}
              {survey.created_at
                ? new Date(survey.created_at).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t("survey.estimated_time")} 5 {t("survey.minutes")}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {questions.length} {t("survey.questions")}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              {t("survey.question")} {currentQuestion + 1} {t("survey.of")}{" "}
              {questions.length}
            </span>
            <span>
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        {currentQ && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQ.question_text}
              </CardTitle>
              {currentQ.info_content && (
                <p className="text-muted-foreground">{currentQ.info_content}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Question Content */}
              <div className="space-y-4">
                {currentQ.question_type === "input" && (
                  <textarea
                    className="w-full p-3 border border-input rounded-md resize-none"
                    rows={4}
                    placeholder={t("survey.enter_answer")}
                    value={answers[currentQ.id] || ""}
                    onChange={(e) =>
                      handleAnswerChange(currentQ.id, e.target.value)
                    }
                  />
                )}

                {currentQ.question_type === "radio" && currentQ.options && (
                  <div className="space-y-2">
                    {currentQ.options.map((option: any, index: number) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question_${currentQ.id}`}
                          value={option.text || option}
                          checked={
                            answers[currentQ.id] === (option.text || option)
                          }
                          onChange={(e) =>
                            handleAnswerChange(currentQ.id, e.target.value)
                          }
                          className="w-4 h-4"
                        />
                        <span>{option.text || option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQ.question_type === "select" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{t("survey.rate_from")} 1</span>
                      <span>{t("survey.to")} 5</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                            answers[currentQ.id] === rating
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground hover:border-primary"
                          }`}
                          onClick={() =>
                            handleAnswerChange(currentQ.id, rating)
                          }
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  {t("survey.previous")}
                </Button>

                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {t("survey.submit")}
                  </Button>
                ) : (
                  <Button onClick={handleNext}>{t("survey.next")}</Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Survey Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>{t("survey.footer_text")}</p>
        </div>
      </div>
    </div>
  );
}

function SurveySkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-8">
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-32"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="flex gap-6">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
          </div>
          <div className="h-2 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}

function SurveyError() {
  const { t } = useTranslation();
  const params = useParams();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-destructive mb-2">
              {t("survey.not_found")}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t("survey.not_found_description")}
            </p>
            <Link href={`/${params.locale}/dashboard`}>
              <Button>{t("survey.back_to_dashboard")}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
