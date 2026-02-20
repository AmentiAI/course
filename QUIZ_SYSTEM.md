# Quiz System Documentation

## Overview
Every lesson now includes a **5-question comprehension quiz** that tests what students actually learned. Quizzes are auto-generated based on lesson content and category.

## Features

### 1. **Automatic Quiz Generation**
- **5 questions per lesson** covering key concepts
- Questions tailored to course category (Web3, AI, Business, etc.)
- 4 multiple-choice options per question
- Instant feedback with explanations

### 2. **Question Types**
Each quiz includes:
1. **Concept Question** - Tests understanding of main ideas
2. **Application Question** - Real-world scenario application
3. **Strategy Question** - Best practices and frameworks
4. **Mistake Question** - Common pitfalls to avoid
5. **Implementation Question** - Next action steps

### 3. **Interactive UI**
- Clean, modern quiz interface with progress tracking
- Select answers before moving forward
- Visual progress bar (X of 5 questions, Y% complete)
- Question status dots showing answered vs. unanswered

### 4. **Instant Results**
- Score displayed as percentage (0-100%)
- Visual feedback: 
  - **80%+** = Green (Great Job! 🎉)
  - **60-79%** = Yellow (Good Effort! 👍)
  - **< 60%** = Red (Keep Learning! 📚)
- Per-question breakdown:
  - ✅ Correct answers in green
  - ❌ Incorrect answers in red with correct answer shown
  - Explanation for every question

### 5. **Progress Tracking**
- Quiz attempts saved to database
- Scores >= 80% automatically mark lesson as complete
- Users can retake quizzes unlimited times

### 6. **Gamification**
- Percentage-based scoring
- Visual success indicators
- Encourages mastery (80%+ passing threshold)

## Database Schema

```prisma
model Quiz {
  id        String @id @default(cuid())
  lessonId  String @unique
  questions Json   // Array of QuizQuestion objects
  lesson    Lesson @relation(...)
  attempts  QuizAttempt[]
}

model QuizAttempt {
  id          String   @id @default(cuid())
  userId      String
  quizId      String
  score       Int      // 0-100
  answers     Json     // User's selected answer indices
  completedAt DateTime @default(now())
  user        User @relation(...)
  quiz        Quiz @relation(...)
}
```

## Question Structure

```typescript
interface QuizQuestion {
  id: string;              // "q1", "q2", etc.
  question: string;        // The question text
  options: string[];       // 4 answer options
  correctAnswer: number;   // Index of correct option (0-3)
  explanation: string;     // Why this is the correct answer
}
```

## API Endpoints

### `POST /api/quiz/submit`
Submit quiz answers and get score.

**Request:**
```json
{
  "lessonId": "clxxx...",
  "answers": [1, 0, 2, 1, 3],  // Selected answer indices
  "score": 80                   // Calculated score (0-100)
}
```

**Response:**
```json
{
  "success": true,
  "attemptId": "clyyy...",
  "score": 80,
  "passed": true  // true if score >= 80%
}
```

## Category-Specific Questions

Quizzes adapt based on course category:

- **Web3/Crypto**: DeFi, NFTs, blockchain fundamentals, risk management
- **AI/Automation**: Problem definition, tool selection, human oversight
- **Business/Marketing**: Audience understanding, data-driven decisions, scalability

## User Flow

1. **Complete Lesson** → Read content with audio narration
2. **See Quiz Card** → "Test Your Knowledge" prompt with question count
3. **Start Quiz** → Answer 5 questions one at a time
4. **Submit Answers** → Get instant score and detailed feedback
5. **Review Results** → See which questions were right/wrong + explanations
6. **Retake (Optional)** → Improve score, master content
7. **Auto-Complete** → 80%+ score marks lesson complete

## Benefits

### For Students
- Reinforces learning immediately
- Identifies knowledge gaps
- Provides actionable feedback
- Builds confidence through mastery

### For Platform
- Engagement metric (quiz completion rate)
- Quality indicator (average scores)
- Retention tool (users retake to improve)
- Completion tracking (auto-mark lessons done)

## Example Quiz Output

**Course**: Bitcoin Trading Mastery  
**Lesson**: Risk Management Fundamentals  
**Category**: Web3 & Crypto

**Question 1**: What is the primary purpose of risk management fundamentals in Bitcoin Trading Mastery?  
**Options**:
- A) To maximize short-term profits without considering risks ❌
- B) To build sustainable, scalable strategies for long-term success ✅
- C) To copy what others are doing without understanding why ❌
- D) To avoid all forms of risk and innovation ❌

**Explanation**: The lesson focuses on building sustainable strategies that prioritize long-term growth and understanding over quick wins.

---

## Implementation Files

- **`lib/quiz-generator.ts`** - Quiz question generation logic
- **`components/LessonQuiz.tsx`** - Interactive quiz UI component
- **`app/api/quiz/submit/route.ts`** - Quiz submission API
- **`lib/seed-all-courses.ts`** - Quiz creation during database seed

## Next Steps

Future improvements:
- [ ] Analytics dashboard for quiz performance
- [ ] Category-specific question templates expansion
- [ ] Adaptive difficulty (harder questions for advanced lessons)
- [ ] Quiz leaderboards
- [ ] Export quiz results as PDF study guides
- [ ] Timed quiz mode (optional challenge mode)

---

**Status**: ✅ Implemented and deployed  
**Database**: Quizzes created for all 70 courses (~1,000+ quizzes total)  
**Passing Threshold**: 80% (4/5 correct)  
**Retakes**: Unlimited
