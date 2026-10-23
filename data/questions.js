/**
 * QuizVerse - Question Bank, Category Definitions, and Localization Strings
 * Completely modular, extensible question dataset.
 */

const QUIZ_CONFIG = {
  siteName: "QuizVerse",
  tagline: "India's Ultimate Trivia & Daily Quiz Hub",
  siteUrl: (typeof window !== "undefined" && window.location && window.location.origin) ? window.location.origin : "https://quizverse.example.com",
  questionsPerQuiz: 10,
  dailyQuestionsCount: 5,
  timePerQuestion: 30, // 30-second timer per question
  basePointsPerCorrect: 100,
  speedBonusMultiplier: 5, // 5 points per second remaining (up to +150 bonus)
  streakMilestones: [3, 7, 14, 30],
  adEveryXQuestions: 5, // Shows interstitial card after question 5
  adSense: {
    publisherId: "ca-pub-XXXXXXXXXXXXXXXX", // REPLACE with your AdSense Publisher ID (e.g. ca-pub-1234567890123456)
    slots: {
      topBanner: "1000000001",
      sidebar: "1000000002",
      interstitial: "1000000003",
      resultCard: "1000000004",
      bottomBanner: "1000000005"
    },
    testMode: true // Set to false when ready for real live AdSense ads
  }
};

const CATEGORIES = [
  {
    id: "cricket",
    name: "Cricket Mania",
    nameHi: "क्रिकेट मेनिया",
    nameGu: "ક્રિકેટ મેનિયા",
    icon: "🏏",
    color: "#2563eb",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    tagline: "From 1983 heroics to modern T20 power hitters",
    badgeName: "Cricket Fanatic",
    seoTitle: "Cricket Trivia Quiz - Test Your IPL, World Cup & Cricket IQ",
    seoDesc: "Play free cricket trivia quizzes online. Test your knowledge of IPL legends, World Cup records, iconic dismissals, and legendary Indian cricket milestones.",
    seoContent: `Cricket is more than just a sport across India and the Commonwealth; it is an enduring passion uniting billions. From Kapil Dev's historic 1983 Prudential World Cup triumph at Lord's and MS Dhoni's legendary winning six at Wankhede Stadium in 2011 to Rohit Sharma's record-shattering three ODI double centuries, Indian cricket history is studded with unforgettable masterclasses. 
Our Cricket Mania trivia challenge covers historic Test rivalries, ICC World Cup moments, IPL championship drama, boundary dimensions, bowling swing physics, and modern T20 stats. Whether you know every nuance of the Duckworth-Lewis-Stern system or simply remember Sachin Tendulkar's Desert Storm in Sharjah, this 10-question rapid quiz tests your memory under the ticking clock. Play daily to sharpen your cricket trivia IQ, earn speed bonuses, and challenge your friends on WhatsApp to see who truly rules the pitch!`
  },
  {
    id: "india_gk",
    name: "Incredible India GK",
    nameHi: "अतुल्य भारत सामान्य ज्ञान",
    nameGu: "અતુલ્ય ભારત સામાન્ય જ્ઞાન",
    icon: "🇮🇳",
    color: "#ea580c",
    gradient: "linear-gradient(135deg, #c2410c 0%, #f97316 100%)",
    tagline: "Geography, polity, national symbols & heritage",
    badgeName: "Bharat Scholar",
    seoTitle: "India GK Quiz - General Knowledge, Heritage & Current Affairs",
    seoDesc: "Sharpen your general knowledge with our India GK quiz. Explore Indian geography, constitution, national parks, historical monuments, and scientific achievements.",
    seoContent: `India is a vast civilization boasting millennia of cultural synthesis, constitutional democracy, and extraordinary geographic diversity. Spanning from the snow-capped Himalayan peaks of Ladakh to the tropical coastlines of Kanyakumari, the Indian subcontinent features 28 states, 8 union territories, and over 100 national parks safeguarding endangered wildlife like the Royal Bengal Tiger and the One-horned Rhinoceros.
Incredible India GK tests your grasp of the Indian Constitution drafted under Dr. B.R. Ambedkar, pivotal river systems like the sacred Ganga and Godavari, UNESCO World Heritage monuments from Khajuraho to Hampi, and modern milestones like ISRO's Chandrayaan and Mangalyaan deep space missions. Tailored for trivia buffs, civil service aspirants, and quiz enthusiasts alike, this quiz challenges your memory with authentic facts, instant explanations, and competitive scoring. Dive in and celebrate the pride of Bharat!`
  },
  {
    id: "science",
    name: "Science & Nature",
    nameHi: "विज्ञान और प्रकृति",
    nameGu: "વિજ્ઞાન અને પ્રકૃતિ",
    icon: "🔬",
    color: "#059669",
    gradient: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    tagline: "Physics, cosmos, chemistry & wonders of biology",
    badgeName: "Curious Scientist",
    seoTitle: "Science & Nature Quiz - Physics, Space, Biology & Chemistry Trivia",
    seoDesc: "Challenge your intellect with our Science and Nature trivia quiz. Learn fascinating facts about astronomy, quantum laws, cellular biology, and chemical reactions.",
    seoContent: `Science is humanity's greatest adventure in uncovering the fundamental laws that govern the cosmos, life on Earth, and subatomic matter. From Sir Isaac Newton's laws of universal gravitation and Albert Einstein's revolutionary spacetime theory to the groundbreaking quantum mechanics formulated by Planck, Bohr, and Raman, scientific exploration continuously reshapes our civilization.
Our Science & Nature quiz spans astrophysics, the periodic table of elements, human anatomy, evolutionary biology, genetics, and modern technological breakthroughs. Discover why the sky appears blue through Rayleigh scattering, how photosynthesis fuels Earth's atmospheric oxygen, and what happens at the event horizon of a supermassive black hole. Designed to be both rigorous and fun, each question features a 30-second countdown timer and instant educational fun facts to satisfy your curious mind.`
  },
  {
    id: "bollywood",
    name: "Bollywood & Cinema",
    nameHi: "बॉलीवुड और सिनेमा",
    nameGu: "બોલીવુડ અને સિનેમા",
    icon: "🎬",
    color: "#db2777",
    gradient: "linear-gradient(135deg, #9d174d 0%, #ec4899 100%)",
    tagline: "Iconic dialogues, chartbuster melodies & silver screen magic",
    badgeName: "Cinephile Star",
    seoTitle: "Bollywood Trivia Quiz - Movies, Iconic Dialogues & Music",
    seoDesc: "Test your Hindi cinema IQ with our Bollywood trivia quiz. From classic masterpieces like Sholay to modern blockbusters and Oscar-winning melodies.",
    seoContent: `Hindi cinema, affectionately known as Bollywood, represents one of the largest and most vibrant film industries on the planet. From pioneering silent films by Dadasaheb Phalke to golden era legends like Raj Kapoor, Guru Dutt, and Madhubala, Indian storytelling has enchanted global audiences for over a century.
Our Bollywood trivia quiz features iconic dialogue challenges, legendary music composer insights from R.D. Burman to A.R. Rahman, box office record holders, and prestigious global accolades like the Academy Awards won by RRR and The Elephant Whisperers. Rediscover the magic of silver screen drama, romance, and comedy while competing for top honors!`
  },
  {
    id: "history",
    name: "World & Ancient History",
    nameHi: "विश्व और प्राचीन इतिहास",
    nameGu: "વિશ્વ અને પ્રાચીન ઇતિહાસ",
    icon: "🏛️",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #5b21b6 0%, #8b5cf6 100%)",
    tagline: "Empires, revolutions, ancient wonders & heroic leaders",
    badgeName: "Chronicle Master",
    seoTitle: "History Trivia Quiz - Ancient Empires, Dynasties & Global Revolutions",
    seoDesc: "Travel back in time with our history quiz. Test your knowledge on the Indus Valley, Maurya Empire, World Wars, and transformative global revolutions.",
    seoContent: `History is the collective chronicle of human triumph, discovery, conflict, and societal evolution. From the urban planning of the bronze-age Indus Valley civilization at Mohenjo-Daro and Harappa to the vast expanse of the Maurya Empire under Emperor Ashoka, the ancient world offers profound wisdom.
This World & Ancient History quiz traverses medieval dynasties, the European Renaissance, the industrial revolution, India's struggle for independence, and geopolitical turning points of the 20th century. Test your historical grasp, uncover hidden historical truths with verified fun facts, and see where you rank among global trivia enthusiasts.`
  }
];

const QUESTIONS_DATA = {
  cricket: [
    {
      id: "c1",
      question: "Who was the captain of the Indian cricket team when they won their maiden World Cup in 1983?",
      options: ["Sunil Gavaskar", "Kapil Dev", "Mohinder Amarnath", "Ravi Shastri"],
      answer: 1,
      fact: "Kapil Dev smashed an unbeaten 175 against Zimbabwe earlier in that tournament after India was 17/5!"
    },
    {
      id: "c2",
      question: "Which batsman holds the record for the highest individual score in an ODI innings (264 runs)?",
      options: ["Martin Guptill", "Virender Sehwag", "Rohit Sharma", "Chris Gayle"],
      answer: 2,
      fact: "Rohit Sharma hit 33 fours and 9 sixes against Sri Lanka at Eden Gardens, Kolkata in November 2014."
    },
    {
      id: "c3",
      question: "At which stadium did MS Dhoni hit his iconic six to seal the 2011 ICC Cricket World Cup victory?",
      options: ["Eden Gardens, Kolkata", "Wankhede Stadium, Mumbai", "M. Chinnaswamy, Bengaluru", "Feroz Shah Kotla, Delhi"],
      answer: 1,
      fact: "Dhoni remained unbeaten on 91 runs from 79 balls and was awarded the Player of the Match."
    },
    {
      id: "c4",
      question: "Who was the first bowler in international cricket to take 800 Test wickets?",
      options: ["Shane Warne", "Anil Kumble", "Muttiah Muralitharan", "James Anderson"],
      answer: 2,
      fact: "Muralitharan claimed his 800th wicket with his final delivery in Test cricket against India in Galle (2010)."
    },
    {
      id: "c5",
      question: "Against which bowler did Yuvraj Singh hit six consecutive sixes in an over during the 2007 T20 World Cup?",
      options: ["Brett Lee", "Stuart Broad", "James Anderson", "Andrew Flintoff"],
      answer: 1,
      fact: "Yuvraj completed his fifty in just 12 balls, which stood as the fastest T20I half-century for nearly 16 years."
    },
    {
      id: "c6",
      question: "What is the standard official length of a cricket pitch between the two bowling creases?",
      options: ["20 yards", "22 yards", "24 yards", "18 yards"],
      answer: 1,
      fact: "22 yards equals exactly 1 chain or 66 feet (20.12 metres) and has been the standard since 1744."
    },
    {
      id: "c7",
      question: "Which franchise won the inaugural season of the Indian Premier League (IPL) in 2008?",
      options: ["Chennai Super Kings", "Rajasthan Royals", "Kolkata Knight Riders", "Mumbai Indians"],
      answer: 1,
      fact: "The underdog Rajasthan Royals were led by legendary Australian leg-spinner Shane Warne."
    },
    {
      id: "c8",
      question: "Who became the first Indian batsman to score a triple century (300+ runs) in Test cricket?",
      options: ["Sachin Tendulkar", "Virender Sehwag", "Rahul Dravid", "Karun Nair"],
      answer: 1,
      fact: "Sehwag scored 309 against Pakistan in Multan in 2004, earning him the nickname 'Multan ka Sultan'."
    },
    {
      id: "c9",
      question: "Which Indian bowler famously claimed all 10 wickets in a single Test innings against Pakistan in 1999?",
      options: ["Harbhajan Singh", "Javagal Srinath", "Anil Kumble", "Zaheer Khan"],
      answer: 2,
      fact: "Kumble took 10 wickets for 74 runs at the Feroz Shah Kotla ground in Delhi on February 7, 1999."
    },
    {
      id: "c10",
      question: "What was the venue for the first-ever Day/Night Test match played with a pink ball in India?",
      options: ["Eden Gardens, Kolkata", "Narendra Modi Stadium, Ahmedabad", "Wankhede Stadium, Mumbai", "Arun Jaitley Stadium, Delhi"],
      answer: 0,
      fact: "India played Bangladesh at Eden Gardens in November 2019, where Virat Kohli scored a century."
    },
    {
      id: "c11",
      question: "Who was the player of the tournament in the 2011 ICC Cricket World Cup?",
      options: ["Sachin Tendulkar", "Yuvraj Singh", "Tillakaratne Dilshan", "Zaheer Khan"],
      answer: 1,
      fact: "Yuvraj scored 362 runs and took 15 wickets while battling early symptoms of cancer during the tournament."
    },
    {
      id: "c12",
      question: "Which cricket ground is popularly revered worldwide as the 'Mecca of Cricket'?",
      options: ["Melbourne Cricket Ground", "Lord's, London", "The Oval", "Eden Gardens"],
      answer: 1,
      fact: "Lord's Cricket Ground in St John's Wood, London was founded by Thomas Lord in 1814."
    },
    {
      id: "c13",
      question: "Who holds the record for scoring the fastest century in ODI cricket (in just 31 balls)?",
      options: ["Shahid Afridi", "Corey Anderson", "AB de Villiers", "Glenn Maxwell"],
      answer: 2,
      fact: "South Africa's AB de Villiers blasted 149 off 44 balls against the West Indies in Johannesburg in 2015."
    },
    {
      id: "c14",
      question: "Which Indian cricketer was the first to score 50 ODI centuries?",
      options: ["Sachin Tendulkar", "Virat Kohli", "Rohit Sharma", "Sourav Ganguly"],
      answer: 1,
      fact: "Virat Kohli reached his 50th ODI century during the 2023 World Cup semi-final against New Zealand in Mumbai."
    },
    {
      id: "c15",
      question: "What does the term 'Chinaman' historically refer to in cricket terminology?",
      options: ["A slow off-cutter", "A left-arm unorthodox spin delivery", "A reverse-swinging yorker", "A bouncer aimed at the ribs"],
      answer: 1,
      fact: "Kuldeep Singh is India's most prominent left-arm unorthodox bowler (wrist spinner)."
    },
    {
      id: "c16",
      question: "Which team has won the most ICC Men's Cricket World Cup trophies (50-over format)?",
      options: ["West Indies", "India", "Australia", "England"],
      answer: 2,
      fact: "Australia has lifted the trophy 6 times (1987, 1999, 2003, 2007, 2015, and 2023)."
    },
    {
      id: "c17",
      question: "Who was the first captain to lift the Women's Premier League (WPL) trophy in 2023?",
      options: ["Meg Lanning", "Harmanpreet Kaur", "Smriti Mandhana", "Alyssa Healy"],
      answer: 1,
      fact: "Harmanpreet Kaur captained the Mumbai Indians women's team to victory in the historic first WPL season."
    },
    {
      id: "c18",
      question: "What is the maximum number of overs a single bowler can bowl in a standard 50-over ODI match?",
      options: ["8 overs", "10 overs", "12 overs", "Unlimited"],
      answer: 1,
      fact: "The 10-over quota ensures that at least 5 different bowlers must be deployed across a full 50-over innings."
    },
    {
      id: "c19",
      question: "Who was the first Indian cricketer to score a century in T20 International cricket?",
      options: ["Rohit Sharma", "Suresh Raina", "KL Rahul", "Yuvraj Singh"],
      answer: 1,
      fact: "Suresh Raina scored 101 against South Africa at Gros Islet in the 2010 ICC Men's T20 World Cup."
    },
    {
      id: "c20",
      question: "In cricket fielding, which position is located directly behind the wicket-keeper on the leg side?",
      options: ["Point", "Deep Fine Leg", "Mid-wicket", "Cover"],
      answer: 1,
      fact: "Fine leg is set on the leg side boundary behind the batsman's popping crease line."
    },
    {
      id: "c21",
      question: "Who bowled the historic final over in the 2007 ICC World Twenty20 final against Pakistan?",
      options: ["S. Sreesanth", "Joginder Sharma", "Harbhajan Singh", "RP Singh"],
      answer: 1,
      fact: "Misbah-ul-Haq scooped Joginder's delivery into the air, caught safely by S. Sreesanth at short fine leg."
    },
    {
      id: "c22",
      question: "Which cricketer holds the career record for the highest batting average in Test cricket (99.94)?",
      options: ["Wally Hammond", "Don Bradman", "Graeme Pollock", "Sachin Tendulkar"],
      answer: 1,
      fact: "Sir Donald Bradman needed just 4 runs in his final Test innings at The Oval to average an even 100, but was dismissed for a duck."
    },
    {
      id: "c23",
      question: "Who was the first bowler to take a hat-trick for India in an ICC Men's World Cup match?",
      options: ["Kapil Dev", "Chetan Sharma", "Mohammed Shami", "Kuldeep Yadav"],
      answer: 1,
      fact: "Chetan Sharma clean-bowled three New Zealand batsmen in Nagpur during the 1987 Reliance World Cup."
    },
    {
      id: "c24",
      question: "Which stadium in the world holds the largest spectator seating capacity for cricket?",
      options: ["Melbourne Cricket Ground (MCG)", "Narendra Modi Stadium, Ahmedabad", "Eden Gardens, Kolkata", "Perth Stadium"],
      answer: 1,
      fact: "The Narendra Modi Stadium boasts an immense spectator seating capacity exceeding 130,000!"
    },
    {
      id: "c25",
      question: "What happens if a ball struck by the batsman hits a fielder's protective helmet resting on the ground?",
      options: ["Dead ball, no runs awarded", "5 penalty runs awarded to batting side", "Batsman declared out", "1 extra run awarded"],
      answer: 1,
      fact: "Under MCC Law 28.3, 5 penalty runs are immediately credited to the batting team if the ball strikes a fielder's helmet."
    },
    {
      id: "c26",
      question: "Who holds the record for taking the most wickets for India across all formats in international cricket?",
      options: ["Kapil Dev", "Anil Kumble", "Ravichandran Ashwin", "Zaheer Khan"],
      answer: 1,
      fact: "Anil Kumble took 956 international wickets (619 in Tests and 337 in ODIs) across his illustrious career."
    },
    {
      id: "c27",
      question: "Which team did India defeat in the final to lift the ICC Champions Trophy in 2013 under MS Dhoni?",
      options: ["South Africa", "England", "Sri Lanka", "Australia"],
      answer: 1,
      fact: "India defended 129 runs in a rain-reduced 20-over final at Edgbaston, winning by 5 runs."
    },
    {
      id: "c28",
      question: "What is the nickname traditionally given to the annual Test cricket series played between England and Australia?",
      options: ["The Border-Gavaskar Trophy", "The Ashes", "The Frank Worrell Trophy", "Wisden Trophy"],
      answer: 1,
      fact: "The Ashes originated after Australia's 1882 win at The Oval, prompting a satirical mock obituary of English cricket."
    },
    {
      id: "c29",
      question: "Which Indian cricketer was named Wisden's Leading Cricketer in the World three consecutive times (2016-2018)?",
      options: ["Rohit Sharma", "Virat Kohli", "MS Dhoni", "Ravindra Jadeja"],
      answer: 1,
      fact: "Virat Kohli scored 10,000 international runs across all formats in those three calendar years."
    },
    {
      id: "c30",
      question: "Who was the fastest Indian fast bowler to reach 100 wickets in Test cricket in terms of balls bowled?",
      options: ["Kapil Dev", "Javagal Srinath", "Jasprit Bumrah", "Mohammed Shami"],
      answer: 2,
      fact: "Jasprit Bumrah achieved 100 Test wickets in only 24 matches, breaking several historic pace bowling milestones."
    }
  ],

  india_gk: [
    {
      id: "g1",
      question: "Which river is widely known as the 'Dakshin Ganga' (Ganga of the South)?",
      options: ["Krishna", "Godavari", "Cauvery", "Narmada"],
      answer: 1,
      fact: "The Godavari is India's second longest river after the Ganga, stretching over 1,465 kilometers."
    },
    {
      id: "g2",
      question: "Who was the Chairman of the Drafting Committee of the Indian Constituent Assembly?",
      options: ["Dr. Rajendra Prasad", "Dr. B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel"],
      answer: 1,
      fact: "Dr. B.R. Ambedkar was unanimously appointed Chairman of the Drafting Committee on August 29, 1947."
    },
    {
      id: "g3",
      question: "Which Indian state has the longest mainland marine coastline?",
      options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
      answer: 2,
      fact: "Gujarat boasts approximately 1,600 km of coastline, accounting for roughly 21% of India's total coast."
    },
    {
      id: "g4",
      question: "In which year did India launch its historic first satellite, 'Aryabhata', into orbit?",
      options: ["1969", "1975", "1983", "1971"],
      answer: 1,
      fact: "Named after the ancient Indian astronomer Aryabhata, it was launched on April 19, 1975 using a Soviet Kosmos-3M rocket."
    },
    {
      id: "g5",
      question: "Which national park in Assam is internationally renowned for sheltering the Great Indian One-Horned Rhinoceros?",
      options: ["Manas National Park", "Kaziranga National Park", "Nameri National Park", "Dibru-Saikhowa"],
      answer: 1,
      fact: "Kaziranga hosts approximately two-thirds of the entire global population of the Great One-Horned Rhinoceros."
    },
    {
      id: "g6",
      question: "What is the official motto inscribed at the base of the Lion Capital of Ashoka in the National Emblem of India?",
      options: ["Vande Mataram", "Satyameva Jayate", "Jai Hind", "Janani Janmabhumishcha"],
      answer: 1,
      fact: "'Satyameva Jayate' (Truth alone triumphs) is taken from the ancient Mundaka Upanishad."
    },
    {
      id: "g7",
      question: "Which classical dance tradition originated and flourished in the state of Kerala?",
      options: ["Kathak", "Kathakali", "Bharatanatyam", "Kuchipudi"],
      answer: 1,
      fact: "Kathakali is celebrated for its elaborate facial makeup, colorful headgear, and expressive hand mudras."
    },
    {
      id: "g8",
      question: "Which mountain peak is the highest geographical point situated completely within India's recognized borders?",
      options: ["K2 (Mount Godwin-Austen)", "Kangchenjunga", "Nanda Devi", "Kamet"],
      answer: 1,
      fact: "Kangchenjunga stands at 8,586 metres on the border of Sikkim and Nepal and is the third highest mountain on Earth."
    },
    {
      id: "g9",
      question: "Which Indian city is famously known across the world as the 'Silicon Valley of India'?",
      options: ["Hyderabad", "Pune", "Bengaluru", "Gurugram"],
      answer: 2,
      fact: "Bengaluru accounts for over 35% of India's software exports and is the headquarters of ISRO, Infosys, and Wipro."
    },
    {
      id: "g10",
      question: "Who was the first Indian citizen to be awarded the prestigious Nobel Prize?",
      options: ["C.V. Raman", "Rabindranath Tagore", "Mother Teresa", "Amartya Sen"],
      answer: 1,
      fact: "Tagore won the Nobel Prize in Literature in 1913 for his sublime collection of poems, 'Gitanjali'."
    },
    {
      id: "g11",
      question: "Which constitutional amendment is known as the 'Mini-Constitution' of India due to its extensive revisions?",
      options: ["42nd Amendment (1976)", "44th Amendment (1978)", "73rd Amendment (1992)", "86th Amendment (2002)"],
      answer: 0,
      fact: "The 42nd Amendment added the words 'Socialist', 'Secular', and 'Integrity' into the Preamble."
    },
    {
      id: "g12",
      question: "Which pass connects the Kashmir Valley with the Ladakh region of Jammu & Kashmir?",
      options: ["Rohtang Pass", "Zoji La Pass", "Nathu La Pass", "Shipki La Pass"],
      answer: 1,
      fact: "Zoji La sits at an altitude of approximately 11,575 feet (3,528 metres) along National Highway 1."
    },
    {
      id: "g13",
      question: "Which Indian state is the leading producer of cardamom and black pepper, earning it the moniker 'Spice Garden of India'?",
      options: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh"],
      answer: 1,
      fact: "Ancient spice trading with Arabs, Phoenicians, Greeks, and Romans centered around ports in Kerala."
    },
    {
      id: "g14",
      question: "Who was the first female President of the Republic of India?",
      options: ["Indira Gandhi", "Sarojini Naidu", "Pratibha Patil", "Droupadi Murmu"],
      answer: 2,
      fact: "Pratibha Devisingh Patil served as the 12th President of India from 2007 to 2012."
    },
    {
      id: "g15",
      question: "On which date does India observe National Science Day every year?",
      options: ["28th February", "15th September", "11th May", "22nd December"],
      answer: 0,
      fact: "It commemorates Sir C.V. Raman's discovery of the Raman Effect on February 28, 1928, which won the 1930 Nobel Prize in Physics."
    },
    {
      id: "g16",
      question: "Which lake is the largest freshwater lake situated in India?",
      options: ["Chilika Lake", "Wular Lake", "Vembanad Lake", "Loktak Lake"],
      answer: 1,
      fact: "Wular Lake in Jammu and Kashmir is fed by the Jhelum River and plays a vital role in the regional ecosystem."
    },
    {
      id: "g17",
      question: "What is the national aquatic animal of India?",
      options: ["Gharial", "Ganges River Dolphin", "Olive Ridley Sea Turtle", "Dugong"],
      answer: 1,
      fact: "The Ganges river dolphin is essentially blind and hunts its prey using sophisticated ultrasonic echolocation."
    },
    {
      id: "g18",
      question: "Which Indian leader was respectfully conferred the popular title 'Frontier Gandhi'?",
      options: ["Maulana Abul Kalam Azad", "Khan Abdul Ghaffar Khan", "Liaquat Ali Khan", "Dr. Zakir Husain"],
      answer: 1,
      fact: "He founded the non-violent 'Khudai Khidmatgar' (Servants of God) movement against British colonial rule."
    },
    {
      id: "g19",
      question: "Which port city is recognized as the oldest operational major port in India, constructed by the British East India Company?",
      options: ["Mumbai Port", "Syama Prasad Mookerjee Port (Kolkata)", "Chennai Port", "Cochin Port"],
      answer: 1,
      fact: "The Port of Kolkata was officially founded in 1870 and remains India's premier riverine port."
    },
    {
      id: "g20",
      question: "In which state is the ancient ruined university of Nalanda, a UNESCO World Heritage site, located?",
      options: ["Uttar Pradesh", "Bihar", "Odisha", "Madhya Pradesh"],
      answer: 1,
      fact: "Nalanda was a world-famous Buddhist monastic university during the Gupta and Harsha eras, attracting scholars from across Asia."
    },
    {
      id: "g21",
      question: "Which schedule of the Constitution of India lists the officially recognized languages of the Republic?",
      options: ["Seventh Schedule", "Eighth Schedule", "Ninth Schedule", "Tenth Schedule"],
      answer: 1,
      fact: "The Eighth Schedule currently recognizes 22 official languages, including Hindi, Gujarati, Tamil, and Bengali."
    },
    {
      id: "g22",
      question: "What is the standard aspect ratio (width to length) of the National Flag of India, the Tiranga?",
      options: ["1:2", "2:3", "3:4", "3:5"],
      answer: 1,
      fact: "The Flag Code of India stipulates that the ratio of the height (width) to length of the flag shall be 2:3."
    },
    {
      id: "g23",
      question: "Which Indian spacecraft successfully made history by landing near the south pole of the Moon in August 2023?",
      options: ["Chandrayaan-1", "Chandrayaan-2", "Chandrayaan-3", "Aditya-L1"],
      answer: 2,
      fact: "Chandrayaan-3's Vikram lander made India the first nation on Earth to touch down near the lunar south pole."
    },
    {
      id: "g24",
      question: "Which Indian state has the highest literacy rate according to official Census data?",
      options: ["Mizoram", "Goa", "Kerala", "Tripura"],
      answer: 2,
      fact: "Kerala consistently leads national literacy tables with literacy rates exceeding 94%."
    },
    {
      id: "g25",
      question: "Which river forms the spectacular Dhuandhar Falls near Jabalpur?",
      options: ["Mahanadi", "Tapi", "Narmada", "Chambal"],
      answer: 2,
      fact: "The Narmada River plunges through dramatic white marble rocks at Bhedaghat to create the smoky mist of Dhuandhar."
    },
    {
      id: "g26",
      question: "Who composed India's National Anthem, 'Jana Gana Mana'?",
      options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Kavi Pradeep", "Muhammad Iqbal"],
      answer: 1,
      fact: "It was originally penned as 'Bharoto Bhagyo Bidhata' in Bengali and officially adopted in Hindi in 1950."
    },
    {
      id: "g27",
      question: "Which wildlife sanctuary was chosen for the historic reintroduction of African Cheetahs to India in 2022?",
      options: ["Ranthambore National Park", "Kuno National Park", "Jim Corbett National Park", "Gir National Park"],
      answer: 1,
      fact: "Kuno National Park is situated in the Sheopur and Morena districts of Madhya Pradesh."
    },
    {
      id: "g28",
      question: "Which latitude line passes through eight Indian states including Gujarat, Rajasthan, and Madhya Pradesh?",
      options: ["Equator", "Tropic of Cancer", "Tropic of Capricorn", "Prime Meridian"],
      answer: 1,
      fact: "The Tropic of Cancer (23.5° N) splits the Indian landmass roughly into northern subtropical and southern tropical halves."
    },
    {
      id: "g29",
      question: "What is the currency symbol of the Indian Rupee (₹) inspired by?",
      options: ["Roman letter 'R' only", "Devanagari 'Ra' combined with Roman capital 'R'", "Sanskrit glyph for wealth", "Bengali numeral 1"],
      answer: 1,
      fact: "Designed by D. Udaya Kumar, the symbol was officially adopted by the Government of India in July 2010."
    },
    {
      id: "g30",
      question: "Which Indian monument was named among the New Seven Wonders of the World in 2007?",
      options: ["Qutub Minar", "Red Fort", "Taj Mahal", "Sun Temple, Konark"],
      answer: 2,
      fact: "Commissioned by Mughal Emperor Shah Jahan in 1632, the white marble mausoleum stands in Agra on the banks of the Yamuna."
    }
  ],

  science: [
    {
      id: "s1",
      question: "What is the speed of light in a vacuum (approximate standard constant)?",
      options: ["150,000 km/s", "300,000 km/s", "450,000 km/s", "1,000,000 km/s"],
      answer: 1,
      fact: "The precise speed of light in a vacuum is 299,792,458 metres per second (approx. 3 × 10^8 m/s)."
    },
    {
      id: "s2",
      question: "Which organelle is universally referred to as the 'powerhouse of the cell'?",
      options: ["Ribosome", "Endoplasmic Reticulum", "Mitochondria", "Golgi Apparatus"],
      answer: 2,
      fact: "Mitochondria generate adenosine triphosphate (ATP), the chemical energy currency consumed by living cells."
    },
    {
      id: "s3",
      question: "Which chemical element has the lowest atomic number on the Periodic Table?",
      options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
      answer: 1,
      fact: "Hydrogen (symbol H, atomic number 1) is the most abundant chemical substance in the universe."
    },
    {
      id: "s4",
      question: "Why does the daytime sky appear blue to the human eye on Earth?",
      options: ["Reflection of the ocean water", "Rayleigh scattering of sunlight", "Presence of ozone gas", "Refraction through clouds"],
      answer: 1,
      fact: "Molecules in the atmosphere scatter shorter blue wavelengths of sunlight far more than longer red wavelengths."
    },
    {
      id: "s5",
      question: "What is the normal average body temperature of a healthy human being in Celsius?",
      options: ["35.0 °C", "37.0 °C", "38.5 °C", "39.2 °C"],
      answer: 1,
      fact: "37 °C equals roughly 98.6 °F, though normal body temperature fluctuates between 36.1 °C and 37.2 °C."
    },
    {
      id: "s6",
      question: "Which planet in our solar system is colloquially known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      answer: 1,
      fact: "Mars appears reddish because its surface regolith is rich in iron oxide (rust)."
    },
    {
      id: "s7",
      question: "Which gas do green plants primarily absorb from the air during the process of photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Methane"],
      answer: 1,
      fact: "Plants use sunlight, water, and CO2 to create glucose, releasing oxygen as a life-giving byproduct."
    },
    {
      id: "s8",
      question: "What is the pH value of pure distilled water at 25 °C (neutral)?",
      options: ["0", "5", "7", "14"],
      answer: 2,
      fact: "A pH of 7 represents neutral acidity; solutions with pH < 7 are acidic, while pH > 7 are basic/alkaline."
    },
    {
      id: "s9",
      question: "Which fundamental force of nature keeps the planets orbiting around the Sun?",
      options: ["Electromagnetic force", "Strong nuclear force", "Gravitational force", "Weak nuclear force"],
      answer: 2,
      fact: "Gravity is an attractive force proportional to mass and inversely proportional to the square of the distance."
    },
    {
      id: "s10",
      question: "What is the hardest naturally occurring mineral substance found on Earth?",
      options: ["Titanium", "Corundum", "Diamond", "Quartz"],
      answer: 2,
      fact: "Diamond rates 10 on the Mohs hardness scale due to its rigid tetrahedral carbon crystal lattice."
    },
    {
      id: "s11",
      question: "Which component of human blood is primarily responsible for carrying oxygen throughout the body?",
      options: ["White Blood Cells", "Platelets", "Hemoglobin in Red Blood Cells", "Blood Plasma"],
      answer: 2,
      fact: "Hemoglobin is an iron-rich protein complex capable of binding four oxygen molecules simultaneously."
    },
    {
      id: "s12",
      question: "Sound waves are unable to travel through which of the following mediums?",
      options: ["Liquid Water", "Solid Steel", "Vacuum of Space", "Dense Air"],
      answer: 2,
      fact: "Sound is a mechanical longitudinal wave requiring physical matter/particles to vibrate and propagate."
    },
    {
      id: "s13",
      question: "What is the chemical formula for ordinary table salt used in cooking?",
      options: ["KCl", "NaCl", "NaHCO3", "CaCl2"],
      answer: 1,
      fact: "Sodium chloride (NaCl) forms an ionic cubic crystal lattice consisting of sodium and chlorine ions."
    },
    {
      id: "s14",
      question: "Which scientist proposed the revolutionary three Laws of Motion and Universal Gravitation?",
      options: ["Albert Einstein", "Sir Isaac Newton", "Galileo Galilei", "Niels Bohr"],
      answer: 1,
      fact: "Newton published these laws in his seminal 1687 work 'Philosophiae Naturalis Principia Mathematica'."
    },
    {
      id: "s15",
      question: "What is the outermost solid layer of the Earth called?",
      options: ["Mantle", "Crust", "Outer Core", "Inner Core"],
      answer: 1,
      fact: "The Earth's crust varies between 5 km in thickness beneath oceans to up to 70 km under continental mountains."
    },
    {
      id: "s16",
      question: "Which vitamin is synthesized naturally by the human skin when exposed to ultraviolet sunlight?",
      options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
      answer: 3,
      fact: "Vitamin D promotes calcium absorption in the gut and is essential for strong bone and immune health."
    },
    {
      id: "s17",
      question: "What type of astronomical body is the Sun classified as?",
      options: ["Red Giant", "White Dwarf", "Yellow Dwarf Star (G-type main-sequence)", "Supernova"],
      answer: 2,
      fact: "The Sun is about 4.6 billion years old and fuses roughly 600 million tons of hydrogen into helium every second."
    },
    {
      id: "s18",
      question: "Which instrument is used by meteorologists to measure atmospheric pressure?",
      options: ["Thermometer", "Barometer", "Anemometer", "Hygrometer"],
      answer: 1,
      fact: "Evangelista Torricelli invented the mercury barometer in 1643 to detect atmospheric changes."
    },
    {
      id: "s19",
      question: "What is the chemical symbol for the precious metal Gold?",
      options: ["Go", "Gd", "Au", "Ag"],
      answer: 2,
      fact: "'Au' comes from 'Aurum', the Latin word for gold, meaning 'shining dawn'."
    },
    {
      id: "s20",
      question: "Which part of the human brain controls involuntary vital functions such as breathing and heartbeat?",
      options: ["Cerebrum", "Cerebellum", "Medulla Oblongata", "Hypothalamus"],
      answer: 2,
      fact: "The medulla oblongata sits at the base of the brainstem and coordinates autonomous life-sustaining reflexes."
    },
    {
      id: "s21",
      question: "Dry ice is the solid frozen state of which common gas?",
      options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Methane"],
      answer: 1,
      fact: "Dry ice sublimes directly from a solid into gas at -78.5 °C (-109.3 °F) without melting into liquid."
    },
    {
      id: "s22",
      question: "What is the closest star system to our Solar System at a distance of about 4.24 light-years?",
      options: ["Sirius", "Proxima Centauri", "Betelgeuse", "Polaris"],
      answer: 1,
      fact: "Proxima Centauri is a low-mass red dwarf star in the Alpha Centauri triple star system."
    },
    {
      id: "s23",
      question: "Which law of physics states that energy can neither be created nor destroyed, only transformed?",
      options: ["First Law of Thermodynamics", "Second Law of Thermodynamics", "Hooke's Law", "Ohm's Law"],
      answer: 0,
      fact: "Also called the Law of Conservation of Energy, it implies the total energy of an isolated system remains constant."
    },
    {
      id: "s24",
      question: "What is the process called when a liquid turns into a gas directly at its boiling temperature throughout its bulk?",
      options: ["Evaporation", "Condensation", "Boiling (Vaporization)", "Sublimation"],
      answer: 2,
      fact: "Boiling occurs when the liquid's vapor pressure equals the external pressure exerted on it."
    },
    {
      id: "s25",
      question: "What is the name of the boundary around a black hole beyond which nothing, not even light, can escape?",
      options: ["Photon Sphere", "Ergosphere", "Event Horizon", "Accretion Disk"],
      answer: 2,
      fact: "The event horizon marks the point where the gravitational escape velocity equals or exceeds the speed of light."
    },
    {
      id: "s26",
      question: "Which blood type is commonly considered the 'universal red blood cell donor'?",
      options: ["A positive", "AB positive", "O negative", "B negative"],
      answer: 2,
      fact: "O negative red blood cells lack A, B, and Rh surface antigens, minimizing the danger of immune rejection."
    },
    {
      id: "s27",
      question: "Which metal is liquid at room temperature (around 20-25 °C)?",
      options: ["Gallium", "Mercury", "Lead", "Tin"],
      answer: 1,
      fact: "Mercury (symbol Hg) has a melting point of -38.83 °C, making it the only metal in a liquid state at room temperature."
    },
    {
      id: "s28",
      question: "What is the chemical formula of ozone, the atmospheric gas that shields Earth from harmful solar UV radiation?",
      options: ["O", "O2", "O3", "O4"],
      answer: 2,
      fact: "The ozone layer is concentrated in the stratosphere between roughly 15 and 35 km above Earth's surface."
    },
    {
      id: "s29",
      question: "What is the SI unit of electrical resistance named after Georg Simon Ohm?",
      options: ["Volt", "Ampere", "Ohm", "Watt"],
      answer: 2,
      fact: "Ohm's Law states that current (I) through a conductor equals voltage (V) divided by resistance (R)."
    },
    {
      id: "s30",
      question: "Which tiny subatomic particle carries a negative electric charge?",
      options: ["Proton", "Neutron", "Electron", "Positron"],
      answer: 2,
      fact: "J.J. Thomson discovered the electron in 1897 through cathode ray experiments, winning the 1906 Nobel Prize."
    }
  ],

  bollywood: [
    {
      id: "b1",
      question: "Which classic film features the legendary iconic villain 'Gabbar Singh' played by Amjad Khan?",
      options: ["Don", "Sholay", "Deewaar", "Zanjeer"],
      answer: 1,
      fact: "Sholay was released on Independence Day in 1975 and ran for more than 5 uninterrupted years at Mumbai's Minerva theatre."
    },
    {
      id: "b2",
      question: "Who composed the Oscar-winning original song 'Naatu Naatu' from the movie RRR?",
      options: ["A.R. Rahman", "M.M. Keeravani", "Pritam", "Amit Trivedi"],
      answer: 1,
      fact: "M.M. Keeravani and lyricist Chandrabose won both the Golden Globe and Academy Award for Best Original Song in 2023."
    },
    {
      id: "b3",
      question: "Which film was selected as India's official entry to the Oscars that made it to the final nomination shortlist in 2001?",
      options: ["Dil Chahta Hai", "Lagaan", "Devdas", "Swades"],
      answer: 1,
      fact: "Directed by Ashutosh Gowariker and starring Aamir Khan, Lagaan was nominated for Best Foreign Language Film."
    },
    {
      id: "b4",
      question: "Who is affectionately revered across India as the 'King of Romance' in Bollywood?",
      options: ["Salman Khan", "Shah Rukh Khan", "Aamir Khan", "Rajesh Khanna"],
      answer: 1,
      fact: "Shah Rukh Khan has starred in blockbuster romantic classics including DDLJ, Kuch Kuch Hota Hai, and Veer-Zaara."
    },
    {
      id: "b5",
      question: "Which movie holds the record for running continuously for over 1,500 weeks at the Maratha Mandir theatre in Mumbai?",
      options: ["Hum Aapke Hain Koun..!", "Dilwale Dulhania Le Jayenge (DDLJ)", "Kabhi Khushi Kabhie Gham", "Maine Pyar Kiya"],
      answer: 1,
      fact: "Directed by Aditya Chopra, DDLJ premiered in October 1995 and became a defining milestone of modern Indian pop culture."
    },
    {
      id: "b6",
      question: "For which Hollywood movie did music maestro A.R. Rahman win two Academy Awards in 2009?",
      options: ["127 Hours", "Slumdog Millionaire", "Million Dollar Arm", "Lagaan"],
      answer: 1,
      fact: "Rahman won for Best Original Score and Best Original Song ('Jai Ho') at the 81st Academy Awards."
    },
    {
      id: "b7",
      question: "Which legendary singer was respectfully bestowed the titles 'Nightingale of India' and Bharat Ratna in 2001?",
      options: ["Asha Bhosle", "Lata Mangeshkar", "K.S. Chithra", "Alka Yagnik"],
      answer: 1,
      fact: "Lata Mangeshkar recorded thousands of songs in over 36 languages across an incredible career spanning seven decades."
    },
    {
      id: "b8",
      question: "Who delivered the iconic dialogue 'Mere paas maa hai' in the 1975 blockbuster 'Deewaar'?",
      options: ["Amitabh Bachchan", "Shashi Kapoor", "Sanjeev Kumar", "Dharmendra"],
      answer: 1,
      fact: "Shashi Kapoor's character Ravi delivered this celebrated reply to his criminal brother Vijay (Amitabh Bachchan)."
    },
    {
      id: "b9",
      question: "Which epic historical drama directed by K. Asif took nearly 14 years to complete and released in 1960?",
      options: ["Pakeezah", "Mughal-e-Azam", "Mother India", "Anarkali"],
      answer: 1,
      fact: "Mughal-e-Azam, starring Prithviraj Kapoor, Dilip Kumar, and Madhubala, was later digitally colorized and re-released in 2004."
    },
    {
      id: "b10",
      question: "Which actress made her acclaimed Bollywood debut in the sports drama 'Dangal' as wrestler Geeta Phogat?",
      options: ["Sanya Malhotra", "Fatima Sana Shaikh", "Zaira Wasim", "Tara Sutaria"],
      answer: 1,
      fact: "Dangal is the highest-grossing Indian film worldwide, having amassed over ₹2,000 crore at the global box office."
    }
  ],

  history: [
    {
      id: "h1",
      question: "Which major ancient urban settlement of the Indus Valley Civilization was located in modern-day Gujarat, famous for its dockyard?",
      options: ["Harappa", "Mohenjo-daro", "Lothal", "Kalibangan"],
      answer: 2,
      fact: "Lothal had the world's earliest known tidal dock, connecting the ancient city to an old course of the Sabarmati river."
    },
    {
      id: "h2",
      question: "Following which devastating battle did Emperor Ashoka renounce warfare and embrace the teachings of Buddhism?",
      options: ["Battle of Kalinga", "Battle of Hydaspes", "Battle of Panipat", "Battle of Magadha"],
      answer: 0,
      fact: "Fought circa 261 BCE, the immense bloodshed of Kalinga deeply remorseful Ashoka, leading him to advocate Dhamma."
    },
    {
      id: "h3",
      question: "In which year did the historic First War of Indian Independence (Sepoy Mutiny) break out against the British East India Company?",
      options: ["1757", "1857", "1905", "1942"],
      answer: 1,
      fact: "Sparked in Meerut on May 10, 1857, it led directly to the British Crown taking over direct governance of India from the Company."
    },
    {
      id: "h4",
      question: "Who led the iconic Salt Satyagraha (Dandi March) from Sabarmati Ashram to the coastal village of Dandi in 1930?",
      options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh"],
      answer: 1,
      fact: "Gandhi and 78 followers marched 240 miles over 24 days to break the British salt tax monopoly on April 6, 1930."
    },
    {
      id: "h5",
      question: "Who was the founder and first ruler of the Mughal Empire in India, following the First Battle of Panipat in 1526?",
      options: ["Humayun", "Akbar", "Babur", "Jahangir"],
      answer: 2,
      fact: "Babur defeated Ibrahim Lodi of the Delhi Sultanate using innovative field artillery and matchlock muskets."
    },
    {
      id: "h6",
      question: "Which Indian revolutionary formed the 'Azad Hind Fauj' (Indian National Army) to liberate India by force during World War II?",
      options: ["Chandra Shekhar Azad", "Netaji Subhas Chandra Bose", "Lala Lajpat Rai", "Rash Behari Bose"],
      answer: 1,
      fact: "Netaji inspired millions with his rallying slogans 'Jai Hind' and 'Give me blood, and I will give you freedom!'."
    },
    {
      id: "h7",
      question: "Which medieval ruler introduced the token copper and brass currency experiment in India, which led to widespread forgery?",
      options: ["Alauddin Khalji", "Muhammad bin Tughluq", "Feroz Shah Tughlaq", "Sher Shah Suri"],
      answer: 1,
      fact: "Muhammad bin Tughluq was known for visionary but poorly executed reforms, including shifting his capital to Daulatabad."
    },
    {
      id: "h8",
      question: "Which ancient king founded the Gupta Empire, inaugurating what historians call the 'Golden Age of India'?",
      options: ["Samudragupta", "Chandragupta I", "Chandragupta Maurya", "Kumaragupta I"],
      answer: 1,
      fact: "Chandragupta I assumed the title 'Maharajadhiraja' (King of Kings) around 319–320 CE."
    },
    {
      id: "h9",
      question: "At which location did the tragic Jallianwala Bagh massacre take place on Baisakhi Day in April 1919?",
      options: ["Lahore", "Amritsar", "Delhi", "Jalandhar"],
      answer: 1,
      fact: "British troops under Acting Brigadier-General Reginald Dyer fired indiscriminately into an unarmed crowd inside the walled garden."
    },
    {
      id: "h10",
      question: "Who was the great Maratha warrior king crowned at Raigad Fort in 1674, founding the Maratha Empire?",
      options: ["Chhatrapati Sambhaji", "Chhatrapati Shivaji Maharaj", "Baji Rao I", "Peshwa Madhavrao"],
      answer: 1,
      fact: "Chhatrapati Shivaji Maharaj pioneered guerrilla warfare (Ganimi Kava) and developed an influential naval fleet."
    }
  ]
};

const TRANSLATIONS = {
  en: {
    siteTitle: "QuizVerse",
    tagline: "India's Ultimate Trivia & Daily Quiz Hub",
    home: "Home",
    categories: "Categories",
    dailyChallenge: "Daily Challenge",
    dailyChallengeSubtitle: "5 unique questions handpicked for today. Test your daily streak!",
    playDaily: "Play Daily Challenge",
    dailyCompleted: "Daily Challenge Completed!",
    dailyCompletedMsg: "You've already conquered today's challenge. Return tomorrow to extend your streak!",
    streak: "Streak",
    days: "Days",
    highScore: "Best",
    pts: "PTS",
    playNow: "Play Quiz",
    question: "Question",
    of: "of",
    timeLeft: "Seconds",
    lifeline5050: "50/50 Lifeline",
    lifelineUsed: "50/50 Used",
    nextQuestion: "Next Question",
    viewResults: "Finish & View Score",
    congratulations: "Bravo!",
    goodEffort: "Good Job!",
    keepPracticing: "Keep Practicing!",
    yourScore: "Your Score",
    accuracy: "Accuracy",
    speedBonus: "Speed Bonus",
    totalPoints: "Total Points",
    rankTitle: "Your Title",
    shareScore: "Share Your Score",
    shareOnWhatsapp: "WhatsApp",
    shareOnX: "X (Twitter)",
    shareOnTelegram: "Telegram",
    shareOnFacebook: "Facebook",
    copyLink: "Copy Link",
    linkCopied: "Link Copied!",
    challengeFriend: "Challenge a Friend",
    downloadCard: "Download Result Card",
    playAgain: "Play Again",
    exploreCategories: "Choose Another Quiz",
    advertisement: "ADVERTISEMENT",
    continueToNext: "Continue to Next Round",
    sponsorNotice: "Quiz continues in a moment. Our sponsors keep QuizVerse 100% free!",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    language: "Language",
    soundOn: "Sound On",
    soundOff: "Mute",
    dailyReminderTitle: "Never Miss a Daily Streak!",
    dailyReminderDesc: "Get a quick daily notification when the new Daily Challenge drops every morning.",
    enableReminders: "Enable Daily Reminder",
    remindMeLater: "Maybe Later",
    reminderEnabled: "Reminders Enabled!",
    cookieNotice: "We use cookies and third-party advertising services (like Google AdSense) to deliver personalized trivia experiences and relevant ads.",
    acceptCookies: "Accept All",
    declineCookies: "Essential Only",
    cookieSettings: "Privacy Settings",
    aboutUs: "About QuizVerse",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    leaderboardTitle: "Local Champions (Top 10)",
    rank: "Rank",
    player: "Player",
    category: "Category",
    date: "Date",
    keyboardHint: "Pro Tip: Use keys 1 - 4 on your keyboard to pick answers quickly!",
    badgesEarned: "Badges Unlocked",
    challengedBy: "🔥 {challenger} scored {score} PTS in {category}! Can you beat them?",
    allRightsReserved: "All rights reserved. Made with ❤️ for trivia lovers in India and worldwide."
  },

  hi: {
    siteTitle: "क्विजवर्स (QuizVerse)",
    tagline: "भारत का पसंदीदा सामान्य ज्ञान और दैनिक क्विज हब",
    home: "होम",
    categories: "श्रेणियां",
    dailyChallenge: "दैनिक चुनौती (Daily Challenge)",
    dailyChallengeSubtitle: "आज के 5 विशेष प्रश्न। अपनी दैनिक स्ट्रीक बढ़ाएं!",
    playDaily: "दैनिक चुनौती खेलें",
    dailyCompleted: "आज की चुनौती पूरी हुई!",
    dailyCompletedMsg: "आपने आज की चुनौती पूरी कर ली है। स्ट्रीक जारी रखने के लिए कल दोबारा आएं!",
    streak: "स्ट्रीक",
    days: "दिन",
    highScore: "सर्वश्रेष्ठ",
    pts: "अंक",
    playNow: "क्विज खेलें",
    question: "प्रश्न",
    of: "में से",
    timeLeft: "सेकंड",
    lifeline5050: "50/50 लाइफलाइन",
    lifelineUsed: "50/50 उपयोग किया गया",
    nextQuestion: "अगला प्रश्न",
    viewResults: "परिणाम देखें",
    congratulations: "शाबाश!",
    goodEffort: "शानदार प्रयास!",
    keepPracticing: "अभ्यास जारी रखें!",
    yourScore: "आपका स्कोर",
    accuracy: "सटीकता",
    speedBonus: "स्पीड बोनस",
    totalPoints: "कुल अंक",
    rankTitle: "आपकी उपाधि",
    shareScore: "स्कोर साझा करें",
    shareOnWhatsapp: "व्हाट्सएप",
    shareOnX: "एक्स (Twitter)",
    shareOnTelegram: "टेलीग्राम",
    shareOnFacebook: "फेसबुक",
    copyLink: "लिंक कॉपी करें",
    linkCopied: "लिंक कॉपी हो गया!",
    challengeFriend: "दोस्त को चुनौती दें",
    downloadCard: "रिजल्ट कार्ड डाउनलोड करें",
    playAgain: "फिर से खेलें",
    exploreCategories: "अन्य क्विज चुनें",
    advertisement: "विज्ञापन (ADVERTISEMENT)",
    continueToNext: "अगले राउंड पर जाएं",
    sponsorNotice: "क्विज कुछ पलों में जारी रहेगा। हमारे प्रायोजक क्विजवर्स को हमेशा मुफ्त रखते हैं!",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    language: "भाषा (Language)",
    soundOn: "ध्वनि चालू",
    soundOff: "मौन",
    dailyReminderTitle: "अपनी दैनिक स्ट्रीक कभी न भूलें!",
    dailyReminderDesc: "हर सुबह नई दैनिक चुनौती आते ही सूचना प्राप्त करें।",
    enableReminders: "रिमाइंडर चालू करें",
    remindMeLater: "बाद में",
    reminderEnabled: "रिमाइंडर सक्रिय!",
    cookieNotice: "हम बेहतर अनुभव और प्रासंगिक विज्ञापनों (जैसे Google AdSense) के लिए कुकीज़ का उपयोग करते हैं।",
    acceptCookies: "स्वीकार करें",
    declineCookies: "केवल आवश्यक",
    cookieSettings: "गोपनीयता सेटिंग्स",
    aboutUs: "हमारे बारे में",
    contactUs: "संपर्क करें",
    privacyPolicy: "गोपनीयता नीति",
    termsConditions: "नियम और शर्तें",
    leaderboardTitle: "लोकल चैंपियंस (शीर्ष 10)",
    rank: "रैंक",
    player: "खिलाड़ी",
    category: "श्रेणी",
    date: "दिनांक",
    keyboardHint: "सुझाव: उत्तर चुनने के लिए कीबोर्ड पर 1 से 4 नंबर दबाएं!",
    badgesEarned: "प्राप्त बैज",
    challengedBy: "🔥 {challenger} ने {category} में {score} अंक बनाए! क्या आप उन्हें हरा सकते हैं?",
    allRightsReserved: "सर्वाधिकार सुरक्षित। भारत और विश्व भर के क्विज प्रेमियों के लिए निर्मित।"
  },

  gu: {
    siteTitle: "ક્વિઝવર્સ (QuizVerse)",
    tagline: "ભારતનું અગ્રણી ક્વિઝ અને દૈનિક સામાન્ય જ્ઞાન હબ",
    home: "હોમ",
    categories: "કેટેગરીઝ",
    dailyChallenge: "દૈનિક પડકાર (Daily Challenge)",
    dailyChallengeSubtitle: "આજના 5 ખાસ પ્રશ્નો. તમારી દૈનિક સ્ટ્રીક વધારો!",
    playDaily: "દૈનિક પડકાર રમો",
    dailyCompleted: "આજનો પડકાર પૂર્ણ થયો!",
    dailyCompletedMsg: "તમે આજનો પડકાર પૂરો કરી લીધો છે. સ્ટ્રીક ચાલુ રાખવા માટે આવતીકાલે ફરી આવો!",
    streak: "સ્ટ્રીક",
    days: "દિવસ",
    highScore: "શ્રેષ્ઠ",
    pts: "પોઇન્ટ્સ",
    playNow: "ક્વિઝ રમો",
    question: "પ્રશ્ન",
    of: "માંથી",
    timeLeft: "સેકન્ડ",
    lifeline5050: "50/50 લાઇફલાઇન",
    lifelineUsed: "50/50 વપરાયેલ છે",
    nextQuestion: "આગળનો પ્રશ્ન",
    viewResults: "પરિણામ જુઓ",
    congratulations: "ખૂબ સરસ!",
    goodEffort: "ઉત્કૃષ્ટ પ્રયાસ!",
    keepPracticing: "પ્રેક્ટિસ ચાલુ રાખો!",
    yourScore: "તમારો સ્કોર",
    accuracy: "ચોકસાઈ",
    speedBonus: "સ્પીડ બોનસ",
    totalPoints: "કુલ પોઇન્ટ્સ",
    rankTitle: "તમારો ખિતાબ",
    shareScore: "સ્કોર શેર કરો",
    shareOnWhatsapp: "વોટ્સએપ",
    shareOnX: "એક્સ (Twitter)",
    shareOnTelegram: "ટેલિગ્રામ",
    shareOnFacebook: "ફેસબુક",
    copyLink: "લિંક કોપી કરો",
    linkCopied: "લિંક કોપી થઈ ગઈ!",
    challengeFriend: "મિત્રને પડકાર આપો",
    downloadCard: "રિઝલ્ટ કાર્ડ ડાઉનલોડ કરો",
    playAgain: "ફરીથી રમો",
    exploreCategories: "બીજી ક્વિઝ પસંદ કરો",
    advertisement: "જાહેરાત (ADVERTISEMENT)",
    continueToNext: "આગળના રાઉન્ડ પર જાઓ",
    sponsorNotice: "ક્વિઝ થોડીવારમાં ચાલુ થશે. પ્રાયોજકોની મદદથી ક્વિઝવર્સ હંમેશા મફત રહે છે!",
    lightMode: "લાઇટ મોડ",
    darkMode: "ડાર્ક મોડ",
    language: "ભાષા (Language)",
    soundOn: "અવાજ ચાલુ",
    soundOff: "મૌન",
    dailyReminderTitle: "તમારી દૈનિક સ્ટ્રીક ક્યારેય ન ચૂકો!",
    dailyReminderDesc: "રોજ સવારે નવો પડકાર આવે ત્યારે તુરંત સૂચના મેળવો.",
    enableReminders: "રિમાઇન્ડર શરૂ કરો",
    remindMeLater: "પછીથી",
    reminderEnabled: "રિમાઇન્ડર સક્રિય થયું!",
    cookieNotice: "અમે સારા અનુભવ અને સુસંગત જાહેરાતો (દા.ત. Google AdSense) માટે કૂકીઝનો ઉપયોગ કરીએ છીએ.",
    acceptCookies: "બધું સ્વીકારો",
    declineCookies: "માત્ર જરૂરી",
    cookieSettings: "પ્રાઇવસી સેટિંગ્સ",
    aboutUs: "અમારા વિશે",
    contactUs: "સંપર્ક કરો",
    privacyPolicy: "ગોપનીયતા નીતિ",
    termsConditions: "નિયમો અને શરતો",
    leaderboardTitle: "સ્થાનિક ચેમ્પિયન્સ (ટોપ 10)",
    rank: "ક્રમ",
    player: "ખેલાડી",
    category: "કેટેગરી",
    date: "તારીખ",
    keyboardHint: "ટીપ: ઉત્તર પસંદ કરવા માટે કીબોર્ડ પર 1 થી 4 કી વાપરો!",
    badgesEarned: "મેળવેલ બેજ",
    challengedBy: "🔥 {challenger} એ {category} માં {score} પોઇન્ટ્સ મેળવ્યા! શું તમે તેમને હરાવી શકો?",
    allRightsReserved: "સર્વાધિકાર સુરક્ષિત. ભારત અને વિશ્વભરના ક્વિઝ પ્રેમીઓ માટે બનાવેલ."
  }
};

// Export for Node environments (testing) without breaking browser global scope
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUIZ_CONFIG, CATEGORIES, QUESTIONS_DATA, TRANSLATIONS };
}

