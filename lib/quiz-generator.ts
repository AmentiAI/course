// Content-aware quiz generator - extracts concepts from actual lesson content

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanation: string;
}

interface ContentAnalysis {
  headings: string[];
  keyPhrases: string[];
  listItems: string[];
  category: string;
}

// Parse markdown content to extract key concepts
const analyzeContent = (content: string, category: string): ContentAnalysis => {
  const lines = content.split('\n');
  const headings: string[] = [];
  const keyPhrases: string[] = [];
  const listItems: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Extract headings (## or ###)
    if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const heading = trimmed.replace(/^#+\s+/, '').replace(/[0-9]+\.\s*/, '');
      if (heading.length > 5 && heading.length < 100) {
        headings.push(heading);
      }
    }
    
    // Extract numbered list items (key strategies/steps)
    if (/^\d+\.\s+\*\*/.test(trimmed)) {
      const item = trimmed
        .replace(/^\d+\.\s+/, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .trim();
      if (item.length > 10 && item.length < 150) {
        listItems.push(item);
      }
    }
    
    // Extract bold phrases (key concepts)
    const boldMatches = trimmed.match(/\*\*([^*]+)\*\*/g);
    if (boldMatches) {
      boldMatches.forEach(match => {
        const phrase = match.replace(/\*\*/g, '').trim();
        if (phrase.length > 5 && phrase.length < 80 && !phrase.match(/^\d+$/)) {
          keyPhrases.push(phrase);
        }
      });
    }
  }
  
  return {
    headings: [...new Set(headings)].slice(0, 10),
    keyPhrases: [...new Set(keyPhrases)].slice(0, 15),
    listItems: [...new Set(listItems)].slice(0, 12),
    category: category.toLowerCase()
  };
};

export const generateQuiz = (
  courseTitle: string,
  lessonTitle: string,
  category: string,
  lessonContent: string
): QuizQuestion[] => {
  // Analyze actual lesson content
  const analysis = analyzeContent(lessonContent, category);
  
  const questions: QuizQuestion[] = [];
  
  // Generate 5 content-specific questions
  questions.push(generateHeadingQuestion(lessonTitle, analysis, 0));
  questions.push(generateConceptQuestion(lessonTitle, analysis, 1));
  questions.push(generateStrategyQuestion(lessonTitle, analysis, 2));
  questions.push(generateApplicationQuestion(lessonTitle, analysis, 3));
  questions.push(generateImplementationQuestion(lessonTitle, analysis, 4));
  
  return questions;
};

// Question 1: Based on actual headings/topics covered
const generateHeadingQuestion = (
  lessonTitle: string,
  analysis: ContentAnalysis,
  index: number
): QuizQuestion => {
  const heading = analysis.headings[0] || lessonTitle;
  const concept = analysis.keyPhrases[0] || 'the core concept';
  
  const isWeb3 = analysis.category.includes('web3') || analysis.category.includes('crypto');
  const isAI = analysis.category.includes('ai');
  
  const wrongAnswers = isWeb3 ? [
    'Maximizing short-term gains without risk management',
    'Following others blindly without research',
    'Avoiding all technical understanding'
  ] : isAI ? [
    'Replacing all human decision-making immediately',
    'Using the most complex tools regardless of need',
    'Ignoring data quality and accuracy'
  ] : [
    'Copying competitors without differentiation',
    'Focusing on vanity metrics over revenue',
    'Scaling before validating product-market fit'
  ];
  
  const correctAnswer = `Understanding ${concept.toLowerCase()} and applying it systematically`;
  const options = [wrongAnswers[0], correctAnswer, wrongAnswers[1], wrongAnswers[2]];
  
  return {
    id: `q${index + 1}`,
    question: `According to the lesson on "${heading}", what is the most important principle?`,
    options,
    correctAnswer: 1,
    explanation: `The lesson emphasizes ${concept.toLowerCase()} as a foundational principle for success.`
  };
};

// Question 2: Based on key concepts from content
const generateConceptQuestion = (
  lessonTitle: string,
  analysis: ContentAnalysis,
  index: number
): QuizQuestion => {
  const concept1 = analysis.keyPhrases[1] || analysis.listItems[0] || 'key strategy';
  const concept2 = analysis.keyPhrases[2] || analysis.listItems[1] || 'implementation';
  
  const isWeb3 = analysis.category.includes('web3') || analysis.category.includes('crypto');
  
  const wrongAnswers = isWeb3 ? [
    'Speed and volume over strategic positioning',
    'Emotional trading based on FOMO',
    'Ignoring on-chain metrics and fundamentals'
  ] : [
    'Quick wins without sustainable systems',
    'Complexity over simplicity and clarity',
    'Activity over measurable outcomes'
  ];
  
  const correctAnswer = concept1.length < 80 ? concept1 : 'Building systematic, repeatable processes';
  
  return {
    id: `q${index + 1}`,
    question: `What does this lesson identify as critical for success?`,
    options: [wrongAnswers[0], correctAnswer, wrongAnswers[1], wrongAnswers[2]],
    correctAnswer: 1,
    explanation: `The lesson specifically covers ${correctAnswer.toLowerCase()} as a key success factor.`
  };
};

// Question 3: Based on strategies/steps from content
const generateStrategyQuestion = (
  lessonTitle: string,
  analysis: ContentAnalysis,
  index: number
): QuizQuestion => {
  const strategy = analysis.listItems[0] || analysis.headings[1] || 'systematic approach';
  
  const isWeb3 = analysis.category.includes('web3') || analysis.category.includes('crypto');
  const isAI = analysis.category.includes('ai');
  
  const wrongAnswers = isWeb3 ? [
    'Jumping between strategies without data',
    'Chasing pumps and ignoring fundamentals',
    'Trading without stop losses or exit plans'
  ] : isAI ? [
    'Automating everything without monitoring',
    'Using AI tools without understanding outputs',
    'Scaling before testing and validation'
  ] : [
    'Launching products without market validation',
    'Spending on ads before optimizing conversion',
    'Expanding offerings before mastering one'
  ];
  
  const correctAnswer = strategy.length < 80 ? strategy : 'Start small, validate, then scale systematically';
  
  return {
    id: `q${index + 1}`,
    question: `Which strategy does the lesson recommend?`,
    options: [wrongAnswers[0], correctAnswer, wrongAnswers[1], wrongAnswers[2]],
    correctAnswer: 1,
    explanation: `The lesson outlines ${correctAnswer.toLowerCase()} as the recommended approach.`
  };
};

// Question 4: Practical application
const generateApplicationQuestion = (
  lessonTitle: string,
  analysis: ContentAnalysis,
  index: number
): QuizQuestion => {
  const concept = analysis.keyPhrases[3] || analysis.headings[2] || 'the concepts covered';
  
  const isWeb3 = analysis.category.includes('web3') || analysis.category.includes('crypto');
  
  const steps = isWeb3 ? [
    'Research thoroughly, start small, track results, adjust based on data',
    'YOLO into high-risk plays without research',
    'Wait for perfect conditions that never come',
    'Copy what worked last cycle without adapting'
  ] : [
    'Define goals, implement incrementally, measure outcomes, iterate based on data',
    'Implement everything at once without testing',
    'Over-plan without taking action',
    'Follow others exactly without customization'
  ];
  
  return {
    id: `q${index + 1}`,
    question: `How should you apply ${concept.toLowerCase()} from this lesson?`,
    options: steps,
    correctAnswer: 0,
    explanation: 'The lesson emphasizes starting strategically, measuring results, and iterating based on actual data.'
  };
};

// Question 5: Next steps after the lesson
const generateImplementationQuestion = (
  lessonTitle: string,
  analysis: ContentAnalysis,
  index: number
): QuizQuestion => {
  const actionItem = analysis.listItems[analysis.listItems.length - 1] || 
                    analysis.headings[analysis.headings.length - 1] || 
                    'one key concept';
  
  const shortAction = actionItem.length < 60 ? actionItem : 'Apply one key concept in your own context';
  
  return {
    id: `q${index + 1}`,
    question: `What is the most effective next step after completing this lesson?`,
    options: [
      'Move to the next lesson without practicing',
      shortAction,
      'Rewatch the lesson multiple times before acting',
      'Wait until you finish the entire course'
    ],
    correctAnswer: 1,
    explanation: 'Immediate application reinforces learning and builds momentum. Taking action on what you just learned is more valuable than passive review.'
  };
};
