// Comprehensive lesson content generator with real, detailed content

export const generateLessonContent = (
  courseTitle: string,
  courseCategory: string,
  lessonTitle: string,
  moduleTitle: string,
  lessonIndex: number
): string => {
  const category = courseCategory.toLowerCase();
  
  // Generate unique, detailed content based on lesson type and category
  const content = `## Overview

${getOverview(lessonTitle, courseTitle, category)}

## What You'll Learn

${getLearningObjectives(lessonTitle, category, lessonIndex)}

## Core Concepts

${getCoreContent(lessonTitle, courseTitle, category, lessonIndex)}

## Practical Application

${getPracticalSteps(lessonTitle, category, lessonIndex)}

## Common Mistakes to Avoid

${getCommonMistakes(lessonTitle, category)}

## Pro Tips

${getProTips(lessonTitle, category, lessonIndex)}

## Action Items

${getActionItems(lessonTitle, category)}

## Key Takeaways

${getKeyTakeaways(lessonTitle, category)}

---

**Next Steps**: Apply what you've learned immediately. Practice makes perfect, and real-world application is where theory meets results.
`;

  return content;
};

function getOverview(lessonTitle: string, courseTitle: string, category: string): string {
  const topic = lessonTitle.toLowerCase();
  
  if (topic.includes('introduction') || topic.includes('getting started')) {
    return `Welcome to this comprehensive lesson on ${lessonTitle}. In this session, we'll lay the foundation for your success in ${courseTitle}. You'll gain a clear understanding of the fundamental principles, key terminology, and the roadmap ahead. This lesson is designed to give you the confidence and clarity to move forward with purpose.`;
  }
  
  if (topic.includes('setup') || topic.includes('tools')) {
    return `Having the right tools and setup is critical to your success. In this lesson, we'll walk through everything you need to get started properly. We'll cover recommended tools, platform requirements, account setup, and best practices for organizing your workspace. By the end, you'll have a professional setup that positions you for efficient, productive work.`;
  }
  
  if (topic.includes('strategy') || topic.includes('planning')) {
    return `Strategy separates amateurs from professionals. In this lesson, you'll learn how to develop a strategic approach that maximizes results while minimizing wasted effort. We'll explore proven frameworks, strategic thinking methods, and how to create a personalized plan that aligns with your goals and resources.`;
  }
  
  if (topic.includes('optimization') || topic.includes('scaling')) {
    return `Once you have the basics down, optimization is where exponential growth happens. This lesson focuses on identifying bottlenecks, streamlining processes, and implementing systems that scale. You'll learn advanced techniques that professionals use to multiply their output without multiplying their effort.`;
  }
  
  if (topic.includes('case study') || topic.includes('example')) {
    return `Real-world examples are invaluable for understanding how theory translates into practice. In this lesson, we'll break down actual case studies, analyzing what worked, what didn't, and the key lessons you can apply to your own journey. These aren't hypothetical scenarios—these are real results from real people.`;
  }
  
  return `This lesson dives deep into ${lessonTitle}, providing you with actionable insights and practical knowledge you can implement immediately. We'll explore the nuances, best practices, and insider strategies that separate successful practitioners from those who struggle. Your understanding of ${courseTitle} will level up significantly after this session.`;
}

function getLearningObjectives(lessonTitle: string, category: string, index: number): string {
  const objectives = [
    `- Master the core principles of ${lessonTitle} and understand how they apply to real-world scenarios`,
    `- Identify the most common pitfalls and how to avoid them before they cost you time or money`,
    `- Implement proven strategies that have generated measurable results for others in this field`,
    `- Develop a systematic approach that you can repeat and refine over time`,
    `- Gain confidence in your ability to execute and see results`,
  ];
  
  if (category.includes('crypto') || category.includes('nft')) {
    objectives.push(`- Understand market dynamics and how to read signals that others miss`);
    objectives.push(`- Learn risk management techniques to protect your capital`);
  }
  
  if (category.includes('marketing') || category.includes('social')) {
    objectives.push(`- Create content strategies that actually drive engagement and conversions`);
    objectives.push(`- Build systems for consistent growth without burning out`);
  }
  
  if (category.includes('business') || category.includes('ecommerce')) {
    objectives.push(`- Develop sustainable business models with predictable revenue streams`);
    objectives.push(`- Learn customer acquisition strategies that scale profitably`);
  }
  
  return objectives.join('\n');
}

function getCoreContent(lessonTitle: string, courseTitle: string, category: string, index: number): string {
  const topic = lessonTitle.toLowerCase();
  
  const content: string[] = [];
  
  content.push(`### Understanding the Foundation\n\nBefore diving into tactics, it's crucial to understand *why* ${lessonTitle} matters in the context of ${courseTitle}. Many people skip this step and wonder why their results are inconsistent. The truth is, without a solid conceptual foundation, you're just guessing.\n`);
  
  content.push(`The key principle here is **${getPrincipleName(topic, category)}**. This means that ${getPrincipleExplanation(topic, category)}. Once you internalize this, everything else becomes easier.\n`);
  
  content.push(`### The Step-by-Step Process\n\n1. **Assessment**: Start by evaluating your current position. Where are you now vs. where you want to be?\n\n2. **Planning**: Create a clear roadmap. Break down the big goal into smaller, manageable milestones.\n\n3. **Execution**: Take consistent action. Small daily progress compounds into major results.\n\n4. **Measurement**: Track your metrics. What gets measured gets improved.\n\n5. **Iteration**: Refine based on data. Double down on what works, eliminate what doesn't.\n`);
  
  if (category.includes('crypto') || category.includes('nft')) {
    content.push(`### Market Analysis\n\nUnderstanding market cycles and trends is non-negotiable. Most people lose money because they enter at the wrong time or exit too early/late. Learn to read:\n\n- Volume patterns and what they signal\n- Support and resistance levels\n- Market sentiment indicators\n- On-chain data and whale movements\n`);
  }
  
  if (category.includes('marketing') || category.includes('content')) {
    content.push(`### Content Strategy\n\nContent without strategy is just noise. Here's how to create content that actually converts:\n\n- **Hook**: Grab attention in the first 3 seconds\n- **Value**: Deliver something useful, entertaining, or inspiring\n- **Call-to-Action**: Guide your audience to the next step\n- **Consistency**: Show up regularly to build trust and authority\n`);
  }
  
  if (category.includes('business') || category.includes('freelance')) {
    content.push(`### Business Fundamentals\n\nProfit = Revenue - Expenses. Seems obvious, but many entrepreneurs forget this. Focus on:\n\n- **Customer Lifetime Value (CLV)**: How much a customer is worth over time\n- **Customer Acquisition Cost (CAC)**: How much it costs to acquire a customer\n- **Unit Economics**: Make sure CLV > CAC or you're out of business\n- **Cash Flow**: Revenue doesn't matter if you run out of money\n`);
  }
  
  content.push(`### Advanced Techniques\n\n${getAdvancedTechniques(topic, category, index)}`);
  
  return content.join('\n');
}

function getPrincipleName(topic: string, category: string): string {
  if (topic.includes('optimization')) return 'Leverage';
  if (topic.includes('strategy')) return 'Intentionality';
  if (topic.includes('scaling')) return 'Systems Over Hustle';
  if (topic.includes('analysis')) return 'Data-Driven Decision Making';
  if (topic.includes('automation')) return 'Work Smarter, Not Harder';
  return 'Focused Execution';
}

function getPrincipleExplanation(topic: string, category: string): string {
  if (topic.includes('optimization')) {
    return 'small improvements across multiple areas compound into massive results. A 1% improvement in 10 areas equals 10% total growth';
  }
  if (topic.includes('strategy')) {
    return 'every action should align with a larger goal. Random activity feels like progress but rarely moves the needle';
  }
  if (topic.includes('scaling')) {
    return 'you cannot scale yourself—you can only scale systems. Build processes that run without you';
  }
  return 'consistent execution beats perfect planning. Done is better than perfect';
}

function getAdvancedTechniques(topic: string, category: string, index: number): string {
  const techniques: string[] = [];
  
  techniques.push(`**Technique #1**: ${getTechnique(1, category)}\n`);
  techniques.push(`**Technique #2**: ${getTechnique(2, category)}\n`);
  techniques.push(`**Technique #3**: ${getTechnique(3, category)}\n`);
  
  return techniques.join('\n');
}

function getTechnique(num: number, category: string): string {
  if (category.includes('crypto') || category.includes('nft')) {
    const cryptoTechniques = [
      'Use dollar-cost averaging (DCA) to reduce timing risk. Invest fixed amounts at regular intervals regardless of price.',
      'Set up automated alerts for specific price levels or on-chain events. React to opportunities before the crowd.',
      'Diversify across different risk tiers: stable (60%), growth (30%), speculation (10%). Adjust based on your risk tolerance.',
    ];
    return cryptoTechniques[(num - 1) % cryptoTechniques.length];
  }
  
  if (category.includes('marketing') || category.includes('social')) {
    const marketingTechniques = [
      'Batch create content in focused sessions. Film 10 videos in one day, then schedule them over 2 weeks.',
      'Repurpose every piece of content across multiple platforms. One long-form video becomes 10 short clips, 1 blog post, 5 tweets.',
      'Use the 80/20 rule: 20% of your content drives 80% of results. Double down on what works.',
    ];
    return marketingTechniques[(num - 1) % marketingTechniques.length];
  }
  
  const generalTechniques = [
    'Implement the "two-minute rule": if a task takes less than 2 minutes, do it immediately. This prevents small tasks from piling up.',
    'Use time-blocking to batch similar activities. Check emails twice a day (not constantly) to maintain focus.',
    'Build templates and SOPs for repetitive tasks. Turn 30-minute tasks into 5-minute tasks with systems.',
  ];
  return generalTechniques[(num - 1) % generalTechniques.length];
}

function getPracticalSteps(lessonTitle: string, category: string, index: number): string {
  return `Now let's get practical. Here's exactly what you should do after this lesson:

**Step 1**: ${getStep(1, lessonTitle, category)}

**Step 2**: ${getStep(2, lessonTitle, category)}

**Step 3**: ${getStep(3, lessonTitle, category)}

**Step 4**: ${getStep(4, lessonTitle, category)}

**Step 5**: ${getStep(5, lessonTitle, category)}

Remember: Knowledge without action is just entertainment. Set a timer for 25 minutes and complete at least Steps 1-3 today.`;
}

function getStep(num: number, lessonTitle: string, category: string): string {
  const steps = [
    `Review your current approach and identify one area for immediate improvement. Write it down.`,
    `Create a specific, measurable goal based on what you learned. Make it achievable within 7 days.`,
    `Take one action right now—even if it's small—to build momentum. Progress beats perfection.`,
    `Schedule time in your calendar for consistent practice. Treat it like a non-negotiable appointment.`,
    `Share your commitment with someone or document your progress publicly. Accountability drives results.`,
  ];
  return steps[(num - 1) % steps.length];
}

function getCommonMistakes(lessonTitle: string, category: string): string {
  const topic = lessonTitle.toLowerCase();
  
  const mistakes = [
    `**Mistake 1: Analysis Paralysis** - Overthinking without taking action. Knowledge accumulation without implementation is procrastination in disguise.`,
    `**Mistake 2: Shiny Object Syndrome** - Jumping to the next strategy before mastering the current one. Depth beats breadth every time.`,
    `**Mistake 3: Ignoring Fundamentals** - Trying advanced tactics without mastering basics. You can't skip steps and expect results.`,
  ];
  
  if (category.includes('crypto') || category.includes('trading')) {
    mistakes.push(`**Mistake 4: Emotional Trading** - Making decisions based on fear or greed instead of data. The market rewards discipline, not emotions.`);
    mistakes.push(`**Mistake 5: Over-Leveraging** - Risking too much capital on a single trade. Preserve capital first, make profits second.`);
  }
  
  if (category.includes('marketing') || category.includes('content')) {
    mistakes.push(`**Mistake 4: Inconsistency** - Posting when you feel like it instead of showing up consistently. The algorithm rewards consistency.`);
    mistakes.push(`**Mistake 5: Copying Others** - Imitating successful creators without understanding why their content works. Find your unique angle.`);
  }
  
  return mistakes.join('\n\n');
}

function getProTips(lessonTitle: string, category: string, index: number): string {
  const tips = [
    `**Pro Tip 1**: The best time to start was yesterday. The second best time is now. Stop waiting for the "perfect" moment—it doesn't exist.`,
    `**Pro Tip 2**: Track everything. You can't improve what you don't measure. Create a simple spreadsheet to monitor your key metrics.`,
    `**Pro Tip 3**: Find a mentor or join a community. Learning from others' mistakes saves years of trial and error.`,
  ];
  
  if (category.includes('crypto') || category.includes('nft')) {
    tips.push(`**Pro Tip 4**: DYOR (Do Your Own Research) is not optional. Never invest based solely on someone's recommendation, even experts.`);
  }
  
  if (category.includes('business') || category.includes('freelance')) {
    tips.push(`**Pro Tip 4**: Your network is your net worth. Build genuine relationships, not transactional ones.`);
  }
  
  return tips.join('\n\n');
}

function getActionItems(lessonTitle: string, category: string): string {
  return `Before moving to the next lesson, complete these action items:

**Immediate (Next 24 Hours)**
- Review your notes and highlight the 3 most important concepts
- Identify one quick win you can implement today
- Set up any necessary tools or accounts mentioned in this lesson

**Short-Term (This Week)**
- Create your action plan based on the frameworks taught
- Start implementing the core strategies
- Track your initial results and document what you learn

**Ongoing**
- Apply these principles consistently in your daily routine
- Revisit this lesson in 30 days to assess your progress
- Share your learnings with others to reinforce your understanding

Success leaves clues. Follow the steps, track your progress, and adjust based on results.`;
}

function getKeyTakeaways(lessonTitle: string, category: string): string {
  return `**Key Takeaway 1**: ${lessonTitle} is not just theory—it's a practical skill that improves with practice and application.

**Key Takeaway 2**: Success comes from consistent execution of fundamentals, not chasing advanced tactics prematurely.

**Key Takeaway 3**: Your results are a direct reflection of your systems and habits. Improve your processes, improve your outcomes.

**Key Takeaway 4**: The gap between where you are and where you want to be is bridged by daily action, not overnight miracles.

Remember: Small, consistent actions compound into extraordinary results over time. Stay focused, stay consistent, and trust the process.`;
}

// Generate comprehensive course introduction
export const generateCourseIntroduction = (
  courseTitle: string,
  courseDescription: string,
  category: string,
  level: string,
  totalHours: number,
  totalLessons: number
): string => {
  return `## Course Overview

${courseDescription}

This ${level.toLowerCase()}-level course is designed to take you from ${getStartPoint(level)} to ${getEndPoint(level)} in ${totalHours} hours across ${totalLessons} comprehensive lessons. Whether you're just starting out or looking to level up your existing skills, this course provides the roadmap, tools, and strategies you need to succeed.

## What Makes This Course Different

**1. Practical, Not Theoretical** - Every lesson includes actionable steps you can implement immediately. No fluff, no filler.

**2. Real-World Examples** - Learn from actual case studies and proven strategies that have generated measurable results.

**3. Step-by-Step System** - Follow a clear, logical progression that builds your skills systematically.

**4. Community Support** - Join the discussion board to ask questions, share wins, and learn from fellow students.

## Who This Course Is For

**Perfect for you if:**
- You're serious about ${getCourseGoal(category, level)} and willing to put in the work
- You want proven strategies, not experimental theories
- You're ready to take consistent action and track your results
- You value practical application over passive learning

**Not for you if:**
- You're looking for a "get rich quick" scheme or magic button
- You're not willing to invest time in learning and implementation
- You expect results without effort or consistent practice

## What You'll Achieve

By the end of this course, you will:

${getCourseOutcomes(category, level)}

## Course Structure

This course is organized into ${Math.ceil(totalHours / 2.5)} comprehensive modules:

${getModuleOverview(totalHours, category)}

## How to Get the Most From This Course

**1. Watch Lessons in Order** - Each lesson builds on the previous one. Don't skip around.

**2. Take Action Immediately** - Apply what you learn in each lesson before moving to the next.

**3. Track Your Progress** - Document your results, challenges, and wins. Review weekly.

**4. Engage with the Community** - Ask questions, share insights, help others. Teaching reinforces learning.

**5. Review and Iterate** - Come back to lessons as needed. Mastery comes from repetition and refinement.

## Time Commitment

- **Total Course Length**: ${totalHours} hours of video content
- **Recommended Pace**: Complete 1-2 lessons per day
- **Implementation Time**: 30-60 minutes per lesson for practice
- **Estimated Completion**: ${Math.ceil(totalLessons / 2)} days (if doing 2 lessons/day)

**Pro Tip**: Don't rush. It's better to master one lesson and implement it than to binge-watch the entire course without taking action.

## Ready to Begin?

Your journey to ${getCourseGoal(category, level)} starts now. Let's make it happen.

Click "Start Learning" to begin with Module 1, Lesson 1.

---

**Remember**: Knowledge without action is just entertainment. Commit to implementation, track your progress, and trust the process. See you in Lesson 1!
`;
};

function getStartPoint(level: string): string {
  if (level === 'BEGINNER') return 'zero experience';
  if (level === 'INTERMEDIATE') return 'foundational knowledge';
  return 'advanced understanding';
}

function getEndPoint(level: string): string {
  if (level === 'BEGINNER') return 'confident competence';
  if (level === 'INTERMEDIATE') return 'advanced expertise';
  return 'mastery level';
}

function getCourseGoal(category: string, level: string): string {
  const cat = category.toLowerCase();
  
  if (cat.includes('crypto') || cat.includes('nft')) {
    return level === 'BEGINNER' 
      ? 'learning crypto fundamentals and making your first profitable trades'
      : 'generating consistent returns in the crypto market';
  }
  
  if (cat.includes('marketing') || cat.includes('social')) {
    return level === 'BEGINNER'
      ? 'building your online presence and growing an engaged audience'
      : 'scaling your audience and monetizing your platform';
  }
  
  if (cat.includes('business') || cat.includes('ecommerce')) {
    return level === 'BEGINNER'
      ? 'launching your first profitable business'
      : 'scaling your business to 6-7 figures';
  }
  
  return 'mastering this skill';
}

function getCourseOutcomes(category: string, level: string): string {
  const outcomes = [
    `- Have a clear, actionable roadmap for achieving your goals`,
    `- Understand the proven frameworks and strategies that work`,
    `- Avoid the common mistakes that cost beginners time and money`,
    `- Build confidence through hands-on practice and implementation`,
    `- Join a community of like-minded learners supporting each other`,
  ];
  
  const cat = category.toLowerCase();
  
  if (cat.includes('crypto') || cat.includes('nft')) {
    outcomes.push(`- Know how to research opportunities and assess risk`);
    outcomes.push(`- Have systems in place for tracking and managing your portfolio`);
  }
  
  if (cat.includes('marketing') || cat.includes('content')) {
    outcomes.push(`- Create content that actually engages and converts`);
    outcomes.push(`- Build sustainable systems for consistent growth`);
  }
  
  if (cat.includes('business') || cat.includes('freelance')) {
    outcomes.push(`- Understand business fundamentals and unit economics`);
    outcomes.push(`- Have repeatable systems for finding and serving customers`);
  }
  
  return outcomes.join('\n');
}

function getModuleOverview(totalHours: number, category: string): string {
  const modulesCount = Math.ceil(totalHours / 2.5);
  const modules = [
    '**Module 1: Fundamentals** - Master the core concepts and build a solid foundation',
    '**Module 2: Strategy** - Develop your personalized roadmap for success',
    '**Module 3: Implementation** - Learn the step-by-step execution process',
  ];
  
  if (modulesCount >= 4) {
    modules.push('**Module 4: Optimization** - Scale and improve your results systematically');
  }
  
  if (modulesCount >= 5) {
    modules.push('**Module 5: Advanced Techniques** - Master pro-level strategies and insider tactics');
  }
  
  if (modulesCount >= 6) {
    modules.push('**Module 6: Mastery** - Reach expert level and build long-term success');
  }
  
  return modules.join('\n');
}
