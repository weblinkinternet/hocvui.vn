import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lesson } from "../data/lessons";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, Clock, AlertCircle } from "lucide-react";

interface ExerciseViewProps {
  lesson: Lesson;
}

export default function ExerciseView({ lesson }: ExerciseViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question

  const currentExercise = lesson.exercises[currentIdx];

  const handleSubmit = useCallback(() => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    if (selectedOption === currentExercise.correctAnswer) {
      setScore(s => s + 1);
    }
  }, [isSubmitted, selectedOption, currentExercise.correctAnswer]);

  // Timer logic
  useEffect(() => {
    if (showResult || isSubmitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, isSubmitted, handleSubmit]);

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (currentIdx < lesson.exercises.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setTimeLeft(60);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
    setTimeLeft(60);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl mx-auto text-center py-20"
      >
        <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-100">
          <Trophy size={48} />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Hoàn thành bài tập!</h2>
        <p className="text-slate-600 mb-10 text-xl">
          Sắc bén lắm! Bạn đã trả lời đúng <span className="font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded-lg">{score}/{lesson.exercises.length}</span> câu hỏi.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={reset}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <RotateCcw size={20} />
            Thử thách lại
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-20 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Bài tập vận dụng</h3>
          <p className="text-sm text-slate-500 font-medium">Chọn câu trả lời đúng nhất</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-colors ${
            timeLeft < 10 ? "border-red-200 bg-red-50 text-red-600 animate-pulse" : "border-slate-100 bg-white text-slate-600"
          }`}>
            <Clock size={18} />
            <span className="font-mono font-bold text-lg">{timeLeft}s</span>
          </div>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
            Câu {currentIdx + 1} / {lesson.exercises.length}
          </span>
        </div>
      </div>

      <motion.div
        key={currentIdx}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="space-y-6"
      >
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <p className="text-xl text-slate-800 font-semibold mb-10 leading-relaxed">
            {currentExercise.question}
          </p>

          <div className="grid grid-cols-1 gap-4">
            {currentExercise.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentExercise.correctAnswer;
              
              let variant = "default";
              if (isSubmitted) {
                if (isCorrect) variant = "correct";
                else if (isSelected) variant = "wrong";
              } else if (isSelected) {
                variant = "selected";
              }

              const classes = {
                default: "border-slate-100 hover:border-blue-400 hover:bg-blue-50/50 text-slate-600",
                selected: "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-lg shadow-blue-100",
                correct: "border-green-500 bg-green-50 text-green-700 font-bold shadow-lg shadow-green-100",
                wrong: "border-red-500 bg-red-50 text-red-700 font-bold shadow-lg shadow-red-100"
              };

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitted}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 text-left ${classes[variant as keyof typeof classes]}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${
                      isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-400 border-slate-200"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-lg">{option}</span>
                  </div>
                  {isSubmitted && isCorrect && <CheckCircle2 size={24} className="text-green-600" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle size={24} className="text-red-600" />}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-6 rounded-3xl border-2 ${
                selectedOption === currentExercise.correctAnswer 
                ? "bg-green-50 border-green-100 text-green-900" 
                : "bg-red-50 border-red-100 text-red-900"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${selectedOption === currentExercise.correctAnswer ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                  {selectedOption === currentExercise.correctAnswer ? <Trophy size={24} /> : <AlertCircle size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    {selectedOption === currentExercise.correctAnswer ? "Tuyệt vời! Chính xác." : "Tiếc quá! Chưa đúng rồi."}
                  </h4>
                  <p className="opacity-80 font-medium leading-relaxed">{currentExercise.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end pt-4">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="px-12 py-4 bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95"
            >
              Kiểm tra
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-3 px-10 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95"
            >
              {currentIdx === lesson.exercises.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
