// import dotenv from "dotenv";
// dotenv.config();
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// node --version # Should be >= 18
// npm install @google/generative-ai

const apiKey = import.meta.env.VITE_API_KEY;
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = apiKey;

async function run() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    { text: "input: who are you? what are you? what can you do?" },
    {
      text: "output: Greetings! I am LetterX, your AI-powered writing companion.  Fueled by Google's cutting-edge Gemini technology, I'm here to elevate your professional communication.Think of me as a highly trained assistant, meticulously crafted to generate polished and persuasive letters. Whether you need crystal-clear business proposals, compelling cover letters, or impactful emails, I'm here to streamline the process and ensure your message lands with impact.My core strength lies in harnessing the vast knowledge of the Gemini LLM, allowing me to tailor each letter to your specific needs and audience.  So, tell me, what kind of masterpiece can we craft together today?",
    },
    {
      text: "input: The letter given below is a sample of job inquiry letter that is sent by an applicant to the HR department manager of a certain company. This letter is a formal letter thus it needs to be typewritten using a formal font and a presentable paper.",
    },
    {
      text: "output: Dear,\n \nI am writing this letter to inquire if you are in need of (position name) ______________ in your boutique. I was told by a friend of mine that you advertised this position last month in the local newspaper thus I am trying to see if it is still on. I am a fresh graduate of (Course Name) _______________ and have maintained an outstanding academic performance. My qualifications will surely fit into (position name) ______________ and rest assured that you will have my commitment to quality work.\n\nI am very hopeful for a positive response on this matter. I would be very thankful if you can include the process of application that I need to do if should your response be a positive one. If you need to contact me for an interview, please do not hesitate to call me at my telephone number _________________.\n \n\nThank you and am looking forward to working with your esteemed company.\n \n\nSincerely Yours,\n\nSignature\nName of the Inquiring Person",
    },
    {
      text: "input: This letter is written by the Manager of a large cooperate firm to his head office in order to clarify a dispute as to the job status of one of his employees. The employee claims he has recently been promoted to make him now 2nd in charge although no notification has been received, this causing some friction amongst employees.",
    },
    {
      text: "output: Dear,\n\nI am the Manager of Block- H writing this letter to clarify a small dispute that has occurred amongst my workers. On the departure of Mr. /Ms. ­­­­________ last month as _________ (designation) and I have received no formal letter to state who will take over his duties.\n\nI am aware that more than one member of my current team did apply for the position, and Mr. _______has stated to me that he has been giving orders from head office, by yourself, that he is now to fill Mr. / Ms. ________position. However he has no written evidence to this fact, and I also find it strange as he is relatively new to the company that you would award him this position.\n\nPlease can you urgently confirm with me the exact job status of Mr._______, and indeed the name of the individual who will be taking over from Mr. / Ms. _________, if indeed it is not Mr. _______ himself,\n\nYours Faithfully,\n\nSignature\n\nName of the Inquiring Person\n\nDesignation",
    },
    { text: "input: Acceptance letter" },
    {
      text: "output: Date:  (Mention the date of issuance)\n\nMr./Ms. (Mention the Full name)\n\nDesignation (Mention Manager Job Title)\n\nCompany Name\n\nCompany Address\n\nCity, state zip code\n\nSubject: Letter for Job Acceptance\n\nDear (Mr./Ms. Name):\n\nIt is with my great pleasure to accept your Job offer to join (employer name) on a (position title) under the team of Mr.(Manager Name). The goals you outlined for the offered Job position are well-matched to my abilities, and I consider it a advantage to join your team.\n\nAs we discussed, my annual salary or Cost to company ( CTC) will be [salary], and medical benefits will commence after 30 days of my joining employment.\n\nI (mention name), thank you for making the Job interview process enjoyable and learning . I look forward to working with you and the (employer name) team. I accept the offer and confirm my joining and will report to work on ( Mention the date of Joining). For any query / information, feel free to call me at (555) 555-5555.\n\nSincerely,",
    },
    { text: "input: Acceptance letter" },
    {
      text: "output: Date: ____\n\nTo,\n\nName of the student\n\nStudent Address\n\nCity, State\n\nSubject: Letter for College Acceptance and Admission Confirmation\n\n Dear Mr. (Name of Student)\n\nCongratulations! This letter is to inform you about your application acceptance to our college (name of the institution) for admission in the session (________)\n\nYour application, high grades, score in the test and your interview have been able to convince our Management for your admission with our college. We assure you quality teaching and a feast of opportunities to improve your record at (name of the institution).\n\nPlease find attached the pdf document with all important information and the acceptance form that is to be filled by you to decide your courses here at (name of institution). The new term will begin from mentioned date (__________) You should ensure that all the formalities should be completed by then.\n\nWarm congratulations from our part!\n\nRegards,\n\nName of the staff\n\nDesignation,",
    },
    { text: "input: Acceptance letter" },
    {
      text: "output: Date: ……..\n\nTo,\n\nName of the Manager with Position\n\nCompany Name \n\nAddress, City & Pin\n\nCountry.\n\nSubject: Job Offer Acceptance Letter  and Confirmation for Joining\n\nDear Ms./ Mr ( Use First Name) \n\nI am pleased to confirm my acceptance of your offer and look forward to reporting to work on the mentioned date(_________). I am aware that as a fresher my base salary will be ________ per month, with added incentives based on the quality of my work.\n\nI would like to thank you for this wonderful opportunity and look forward long and rewarding professional association with (Mention the Company Name)\n\nSincerely,\n\nSignature",
    },
    { text: "input: College Acceptance Letter" },
    {
      text: "output: Date: …..\n\nTo,\n\nStudent Name\n\nStudent Complete Address\n\nCity, State, Country\n\nSubject: College Acceptance Letter and Confirmation of Admission\n\nCongratulations!\n\nDear Mr./Ms ( First Name )\n\nWe are pleased to announce that your application to ( College Name ) has been approved. \n\nWe would also like to congratulate you on your impressive academic record and we assure you that you will have plenty of opportunities to improve that record here at ( College Name ) .\n\nPlease find attached the check list of documents required to submit and other details about the completion of admission as well as the books and other particulars needed for study. The term will begin on ( Mention the date & Year ) ensure completing all the formalities before the term begin.\n\nBest Regards,\n\nName & Designation",
    },
    { text: "input: Agreement Termination" },
    {
      text: "output: From,\n\nSender Address_________\n \n\nDate (Mention the Date )\n\nTo,\n\nReceiver Address______\n \n\nSubject: Termination of the service agreement\n\nBy this letter hereby it is inform you that we are terminating agreement with your company. We hoped to have a good level of partnership with your company. But unfortunately your payment services do not meet up with the lines of the agreement. Our company is facing problems due to payment delays and untimed orders from your company. And hence we decided to end up the contract with your company with will be effective from the Date (date of the termination).\n\nYou are requested to clear up all our pending due payments within the termination date. We also promise to deliver our due supplies within contract date ends up.\n\n \n\nThanking you,\n\n \n\nYours sincerely,\n\nName of the company",
    },
    { text: "input: Agreement Termination" },
    { text: "output: " },
    { text: "input: Announcement Letter?" },
    {
      text: "output: Subject: Welcome New Employee Announcement\n\n \n\nGreetings!\n\nThe ABC Organization is pleased to welcome a new partner, Michael Cane, to the board of directors of the company. Mr. Cane grew up here in Delhi but has spent the last eight years working in the field of education and social services in Paris. His commitment to education, especially of the poor, has won him accolades the world over.\n\nHe will be Head of the Department of Social Development and Social Welfare at ABC Organization, working closely with the government for the upliftment of the poor in our country. We are honored to have him with us and are happy he has decided to return to his home country and bring his valuable experience to our office.\n\n \n\nWe wish him a long and prosperous future at our organization!\n\nThank you,\n\n \n\nName\n\nDesignation\n\nCompany Name.",
    },
    { text: "input: Announcement Letter?" },
    {
      text: "output: Date:__________ \n\nTo,\n\nName of the Person\n\nDesignation\n\nAddress ____________\n\n \n\nSubject: New job announcement\n\n \n\nDear Madam / Sir __________.\n\nThis letter is written to inform you that there is a position vacant for marketing manager in our company. Your agency has been working with us during the last two years and we already employed 5 people that you found and recommended to us. Please, see below the requirements necessary for applying to this position:\n\nPerson´s Specification / Job Specifications\n\nBachelor/MBA Degree in Marketing\n\nMinimum 3 years experience in a similar position\n\nExcellent communication skills\n\nThe knowledge of foreign language is preferable\n\nHigh sense of responsibility\n\n \n\nThe job includes the following responsibilities: \n\nLead marketing department\n\nAchieve targets of the company\n\nMust be good in motivating people\n\nOnce the competitors will meet the previously mentioned prerequisites and concur with the duties, benevolently approach you to get in touch with us for orchestrating the meeting. Please, note that the position will be open until the dated _________.\n\n \n\nI would like to thank you again for the services provided and hope we will hire the excellent candidate with your support.\n\n \n\nSincerely,\n\nName of the Person\n\nDesignation\n\nOrganization Name\n\nAddress ____________",
    },
    { text: "input: announcement Letter?" },
    {
      text: "output: Date:__________ \n\nTo,\n\nName of the Person\n\nDesignation\n\nAddress ____________\n\n \n\nSubject: New job announcement\n\n \n\nDear Madam / Sir __________.\n\nThis letter is written to inform you that there is a position vacant for marketing manager in our company. Your agency has been working with us during the last two years and we already employed 5 people that you found and recommended to us. Please, see below the requirements necessary for applying to this position:\n\nPerson´s Specification / Job Specifications\n\nBachelor/MBA Degree in Marketing\n\nMinimum 3 years experience in a similar position\n\nExcellent communication skills\n\nThe knowledge of foreign language is preferable\n\nHigh sense of responsibility\n\n \n\nThe job includes the following responsibilities: \n\nLead marketing department\n\nAchieve targets of the company\n\nMust be good in motivating people\n\nOnce the competitors will meet the previously mentioned prerequisites and concur with the duties, benevolently approach you to get in touch with us for orchestrating the meeting. Please, note that the position will be open until the dated _________.\n\n \n\nI would like to thank you again for the services provided and hope we will hire the excellent candidate with your support.\n\n \n\nSincerely,\n\nName of the Person\n\nDesignation\n\nOrganization Name\n\nAddress ____________",
    },
    { text: "input: Business Announcement Letter" },
    {
      text: "output: Date:__________\n \n\nFrom\nName of the Person\nAddress __________\nEmail ID __________\nContact No.________\n \n\nTo,\nName of the Person\nDesignation\nAddress ____________\n\n\nSubject: Business Announcement Letter\n\n \n\nDear,\n\n\nI would like to inform you all that from today onwards you all will be having a new attendance record keeper which we call as biometrics. This machine can keep attendance record of 10,000 people and will keep record of incoming and outgoing of employees. This machine has been designed to reduce the load of HR department. \n\nSome of the salient features of this software includes Keeping track of the attendance record, Using access card for recording the incoming and outgoing timing of employees, Maintaining the leave status, joining date, Salary earned and other details; and printing the salary slips of all employees.\n\nPerson can get all the details with a single click on his PC. It not only reduces the manual labor but also saves a lot of time. We have tried our software on two companies and results are encouraging. We request you to try our software and give us feedback.\n\nI am enclosing the product brochure for your information along with this letter. I will ask my marketing team to arrange a presentation and demonstration as per your available time.\n \n\n\nLooking forward for your positive reply.\n \n \n\nYours Truly,\n\n \n\n\nName of the Person\nDesignation\nOrganization Name",
    },
    { text: "input: cover letter" },
    {
      text: "output: Dear Mr. Englund:When I learned of Pear Tree Financial’s need for a new Bank Customer Service Representative, I felt compelled to submit the enclosed resume. As an enthusiastic and driven professional with experience in managing customer account services, executing financial transactions, and providing exceptional customer service, I am more than prepared to exceed your expectations for this role.During my career, I have gained comprehensive experience and knowledge in customer relationship management, regulatory compliance, and general operational support. My demonstrated success in assessing customer needs and requirements, along with collaborating with fellow team members, positions me to make a significant impact on Pear Tree Financial.Highlights of my experience include… More than eight years of experience as a Customer Service Representative with the National Bank of Cleveland, providing overarching assistance in account service / management, product cross-sales, transaction processing, and issue resolution. Delivering comprehensive information to customers regarding bank accounts, products, policies, and services; opening and closing accounts and products including checking, savings, money market, CDs, ATM/debit cards, wire transfers, ACHs, cashier’s checks, stop payments, and loan payments. Researching and rectifying service-related concerns while demonstrating superior presentation, interpersonal, and problem-solving skills and ensuring compliance with bank/industry regulations and quality standards. Providing navigational assistance with online and mobile banking services. Earning ongoing accolades from customers for unparalleled customer service skills.With my experience in the banking industry, combined with my proven record of excellence in customer service and my inherent communication and analytical skills, I am ready to provide outstanding service within Pear Tree Financial. I look forward to discussing the position with you in detail.Thank you for your time and consideration.Sincerely,Martha R. Nowicki",
    },
    { text: "input: cover letter" },
    {
      text: "output: Dear Ms. Berardi:Upon learning of your need for an Engineer at Extrusion Global, I felt compelled to submit my resume for your review. With more than 18 years of experience in utilities installation, modification, and maintenance, as well as my superior project management and team leadership abilities, my talents would significantly benefit your company in this role.From determining project scope and interacting with clients to overseeing comprehensive engineering functions, and training and supervising teams, I demonstrate success in driving all phases of engineering project life cycle management from ground to finish. My ability to achieve project goals—as well as my commitment to ensuring adherence to budgetary, deadline, and safety requirements—position me ready to thrive in this position.Consider the following highlights of my qualifications: Facilitating project success through expertise in plumbing, water distribution, wastewater collection / treatment, fire suppression, backflow prevention, natural gas, and liquid fuel storage / distribution / dispensing systems. Supervising all aspects of operations, maintenance, and repair projects, including training and managing teams to ensure top-quality outcomes. Utilizing exceptional research and analysis talents to determine project needs and requirements and realize optimal customer service and satisfaction.With my extensive experience in engineering project management, coupled with my leadership skills and my communication and time management abilities, I could swiftly surpass your expectations for this role. I look forward to discussing the position in further detail. Thank you for your consideration.Sincerely,Neil J. Smith",
    },
    { text: "input: cover letter" },
    {
      text: "output: Dear Ms. Elwright,I am writing to express my strong interest in being the next Full Stack Developer at Majestic Digital Technologies. With my skills and background, I am confident that I will quickly surpass your expectations for this role.In my role as Full Stack Developer at RSA Consulting, I have been tasked with developing training materials including Computer Based Training, developing web applications such as front-end user interface, database management, liaising with customers and internal team and assisting with help desk tickets. I have the required skills outlined in the job description. I have advanced proficiencies in HTML, CSS, JavaScript, excellent customer service skills and am familiar with SQL. I also have a solid foundation in MongoDB, Express, AngularJS, and Node.JS. In addition to four years work experience, I hold a Bachelor degree in Computer Science. I have obtained TS clearance and have the ability to obtain a SCI if so required.My excellent work ethic has provided me with many opportunities to accomplish goals that have earned me recognition at work. Some of these accomplishments include: Wrote numerous unit and API tests Developed web design solutions and applications for clients winning past and current employers six-figure contracts Resolved more than 250 critical bugs to improve performance and user experienceI am confident that you will find my hands-on experience; qualifications and proficiencies make me an excellent candidate for the Full Stack Developer position at Majestic Digital. Thank you for your time and consideration. Please let me know if there is anything further you need from me.SincerelyNicholas McGregor",
    },
    { text: "input: recommendation" },
    {
      text: "output: Dear Ms Edwards,\n\nI am writing to recommend May Thompson. She worked with me at Acme Inc. as a Senior Sales Manager and reported to me in my position as VP of Sales.\n\nAs an employee, May was always reliable and resourceful. During her time in my team, she managed to build a strong sales team from scratch. Her team exceeded our annual goals on closed deals for three consecutive years. May also conducted high-impact customer research and made a number of key recommendations for our product positioning strategies.\n\nI’ve always put a premium on leadership and problem-solving qualities among my team members and May never failed to deliver on both fronts. An example was how she motivated her team members with multiple fun competitions that she also used as coaching opportunities for more junior employees. She also helped resolve a major conflict between the sales and product team regarding features our customers were asking for.\n\nMay is a delight to work with – a team player with a positive, can-do attitude all the way. I wouldn’t hesitate to hire her again if the opportunity arose.\n\nShould you have any further questions, feel free to reach me at +10000000.\n\nThanks,\n\nSarah Potter\n\nVP of Sales, Acme Inc.",
    },
    { text: "input: recommendation" },
    {
      text: "output: To the admissions office of MIT,\n\nI am writing to recommend Luke Thompson for your PhD program in chemical engineering. I am a professor of chemical engineering at Acme University for over 15 years and I specialize in nanotechnology. Mr Thompson was my student for two years before he got his Bachelor’s degree from Acme.\n\nAs a student, Mr Thompson always possessed a curious mind and was eager to learn. During his time in my class, he worked on various projects where he conducted research on nanotechnology and biotechnology. His grades on all these projects were outstanding, as his papers were well-researched, well-structured and offered brilliant insights. One example is his project about nanosensors and their impact on the field of biomedicine. We submitted this paper to a conference held in Berlin and got immediately accepted.\n\nI’ve always put a premium on initiative and hard work among my students and Mr Thompson never failed to deliver. An example was when he and a couple of other students organized learning sessions with different professors. In these open sessions, any student could ask questions on each professor’s field of expertise. Mr. Thompson was the one who suggested that these sessions could work as informal career orientation for younger college or high school students, too.\n\nMr Thompson is intelligent, hard working and has a great passion for the field of chemistry and chemical engineering. I wouldn’t hesitate to collaborate with him in an academic capacity.\n\nShould you have any further questions about him, feel free to reach me at +1000000.\n\nThanks,\n\nProfessor Sally McPhee",
    },
    { text: "input: resignation" },
    {
      text: "output: Dear [Manager’s Name],\n\nPlease accept this letter as formal notification of my intention to resign from my position as [job title] with [company name]. My final day will be [date of last day] as per my notice period.\n\nI would like to thank you for the opportunity to have worked in the position for the past [time in employment]. I have learned a great deal during my time here and have enjoyed collaborating with my colleagues. I will take a lot of what I have learned with me in my career and look back at my time here as a valuable period of my professional life. \n\nDuring the next [notice period in weeks], I will do what I can to make the transition as smooth as possible and will support in whatever way I can to hand over my duties to colleagues or my replacement. Please let me know if there is anything further I can do to assist in this process.\n\nSincerely,\n\n[Your Name]",
    },
    { text: "input: resignation" },
    {
      text: "output: Dear [Manager’s Name],\n\nI am writing to formally notify you of my resignation from the position of [job title] with [company name]. Per my notice period, my final day will be [date of last day].\n\nFollowing careful reflection, I have decided to step down from my role at [company name] to move forward in a direction that aligns more closely with my professional aspirations.\n\nI am thankful for the opportunities and experiences provided to me during my tenure at [company name]. The valuable skills I have gained here are deeply appreciated and will undoubtedly benefit me in my ongoing professional journey.\n\nIn the coming weeks before [end date], I am fully committed to assisting in ensuring a smooth transition.\n\nSincerely,\n[Your Name]",
    },
    { text: "input: resignation" },
    {
      text: "output: Dear [Manager’s Name],\n\nI am writing to formally notify you of my resignation from the position of [job title] with [company name]. Per my notice period, my final day will be [date of last day].\n\nI have been offered another role that will halve my daily commute and allow me to spend more time with my family outside of working hours.\n\nI have thoroughly enjoyed my time at [company] over the last [years and months of service], and I would like to thank you for all of the opportunities I have been afforded here.\n\nIn the coming weeks before [end date], I am fully committed to assisting in ensuring a smooth transition.\n\nSincerely,\n[Your Name]",
    },
    { text: "input: thankyou" },
    {
      text: "output: Mr. Archie Weatherby\nCalifornia Investments, Inc.\n25 Sacramento Street\nSan Francisco, CA 94102\nDear Mr. Weatherby,\nThank you for taking the time to discuss the insurance broker position at California Investments, Inc., with me. After\nmeeting with you and observing the company's operations, I am further convinced that my background and skills\ncoincide well with your needs.\nI really appreciate that you took so much time to acquaint me with the company. It is no wonder that California\nInvestments retains its employees for so long. I feel I could learn a great deal from you and would certainly enjoy\nworking with you.\nIn addition to my qualifications and experience, I will bring excellent work habits and judgment to this position. With\nthe countless demands on your time, I am sure that you require people who can be trusted to carry out their\nresponsibilities with minimal supervision.\nI look forward, Mr. Weatherby, to hearing from you concerning your hiring decision. Again, thank you for your time\nand consideration.\nSincerely,\nJohn Oakley",
    },
    { text: "input: thankyou" },
    {
      text: "output: Dr. Steven Page\nRolling Hills School Health Clinic\n5 Main Street\nSan Francisco, CA 94102\nDear Dr. Page:\nThank you so much for taking the time to interview me today for the social worker position.\nI felt a wonderful rapport not only with you, but with the whole Rolling Hills School Health Clinic staff. I am more\nconvinced than ever that I will fit in beautifully as a member of the team and contribute my skills and talents for the\nbenefit of schoolchildren in the Rolling Hills district.\nI can make myself available for any further discussions of my qualifications that may be needed.\nAgain, Dr. Page, I very much appreciate you and your staff taking so much time to talk with me about this exciting\nopportunity.\nSincerely,\nJohn Oakley",
    },
    { text: "input: informal" },
    {
      text: "output: B-32, sector-11\n\nRohini\n\nNew Delhi-110034\n\nJanuary 10, 2023\n\nDear Muskan\n\nMy happiness knew no bounds when I got to know that you have topped your school and achieved your dream. I felt so pleased that I wish I were there to congratulate you personally.\n\nThe result has proved that hard work, determination, and perseverance bring good results. You were so laborious and passionate about it. I know you were very nervous too, but I was always very confident that you would come out with flying colors. I apologize that I couldn’t even attend the celebration party despite my wishes.\n\nHope to see you soon. Please be encouraged and continue your hard work. Your future is very bright. My parents and elder sister have sent lots of love and heartiest congratulations.\n\nWith lots of love and best wishes.\n\nYours lovingly\n\nShefali",
    },
    { text: "input: informal" },
    {
      text: "output: B-32, sector-11\n\nRohini\n\nNew Delhi-110085\n\nMarch 15, 2023\n\nDear Muskan\n\nHow have you been? I hope my letter finds you in best of health and spirits. It has been almost a month since I transferred to the boarding school. I am very happy in my new school. The classes and dormitories are very spacious. There are well equipped science laboratories and a library with a great collection of books. The school has amazing sports facilities such as swimming pool, horse riding track and archery range.\n\nI believe my life here will be interesting and enjoyable. Although I have made many new friends, I still miss you and the other friends. Please, pay my regards to your parents.\n\nYours sincerely\n\nAakriti/ Abhinav",
    },
    { text: "input: informal" },
    {
      text: "output: 96, Gandhi Street, Salem.\n\nSeptember 27, 2023\n\nDear Abi,\n\nI am so excited to know that you have topped your board examinations. It's been a long time since we met. I wish I could congratulate you in person.\n\nYour result has proved how much effort, hard work, and dedication you have given to your exams. I am not shocked by this news because I have known since we were in class 2. You have always been a sincere and hardworking girl. I knew that you are a bit nervous but then I was sure that you will score brilliantly. The only thing I regret is that I couldn't be there with you at the celebration party because I was having my exams then.\n\nHope to meet you as soon as possible. May parents and grandparents have congratulated you on your success!\n\nWith lots of love,\nYours lovingly,\nPaul.",
    },
    { text: "input: informal" },
    {
      text: "output: 100, Abinaya Apartment,\nLakshmi Avenue, Chennai - 26\n\nSeptember 23, 2023\n\nDear Clara,\n\nIt's been a long time since we met. How are you? I hope you are doing well? I hope this letter finds you in good health.\n\nAs you know that summer vacation has already started, I was thinking of spending the vacations together in Mumbai. I want you to take you out on the city tour as well as introduce my friends and family to you. I would love to go out and have street food with you. We can enjoy some time near Marine Drive.\n\nI am just excited at the thought of me and you spending the vacations together. I just hope that you share your response with me and let me know if it possible for you to come to my place.\n\nWith lots of love,\nYours lovingly,\nShakshi.",
    },
    { text: "input: informal" },
    {
      text: "output: 106, Navi Apartment, Park Avenue, Coimbatore - 26\n\nSeptember 27, 2023\n\nDear Rithul,\n\nI hope this letter finds you in good health. Last week I got to know about your accident and I was highly depressed.\n\nThank God that he saved you from something very serious. Everything is going to be ok. I had a word with the doctor yesterday and he told me that there is nothing to worry about for the time being. Just a few more days in the hospital and you will be back home! I also had a talk with your mom and she was very upset with whatever has happened. But now she is happy that you are recovering.\n\nI have good news for you. Your family and friends including me have decided to celebrate once you come back. My brother and other family members are also praying for your speedy recovery. Hope to see you soon and in good health!\n\nLots of Love,\nYours truly,\nViplav.\n106, Navi Apartment, Park Avenue, Coimbatore - 26\n\nSeptember 27, 2023\n\nDear Rithul,\n\nI hope this letter finds you in good health. Last week I got to know about your accident and I was highly depressed.\n\nThank God that he saved you from something very serious. Everything is going to be ok. I had a word with the doctor yesterday and he told me that there is nothing to worry about for the time being. Just a few more days in the hospital and you will be back home! I also had a talk with your mom and she was very upset with whatever has happened. But now she is happy that you are recovering.\n\nI have good news for you. Your family and friends including me have decided to celebrate once you come back. My brother and other family members are also praying for your speedy recovery. Hope to see you soon and in good health!\n\nLots of Love,\nYours truly,\nViplav.106, Navi Apartment, Park Avenue, Coimbatore - 26\n\nSeptember 27, 2023\n\nDear Rithul,\n\nI hope this letter finds you in good health. Last week I got to know about your accident and I was highly depressed.\n\nThank God that he saved you from something very serious. Everything is going to be ok. I had a word with the doctor yesterday and he told me that there is nothing to worry about for the time being. Just a few more days in the hospital and you will be back home! I also had a talk with your mom and she was very upset with whatever has happened. But now she is happy that you are recovering.\n\nI have good news for you. Your family and friends including me have decided to celebrate once you come back. My brother and other family members are also praying for your speedy recovery. Hope to see you soon and in good health!\n\nLots of Love,\nYours truly,\nViplav.",
    },
    { text: "input: informal" },
    {
      text: "output: 62, B - block, Nehru Road, Namakkal -19\n\nSeptember 27, 2023\n\nDear Aarthi,\n\nHow are you doing? I hope all is well. I just read the novel which you wrote last week in Kolkata. How can someone write so beautifully? Amazing! My father has also appreciated your work and has asked me to tell you that you are doing an incredible job.\n\nI really appreciate the words that you have used and the tone. The best part of your novel is that your work is absolutely real and derived from real-life experiences. It shows your writing skills and how much effort you have given to your writings. You have done absolute justice and I am proud of the way you have handled it.\n\nRatula, it has been two years since we have drifted apart because of our higher studies and career. I hope to meet you soon. Go ahead! The sky is the limit!\n\nWith best wishes,\nYours lovingly,\nSupriya.",
    },
    { text: "input: informal" },
    {
      text: "output: 28, VOC road, Erode - 24\n\nSeptember 27, 2023\n\nDear Ritul,\n\nI hope you are doing well. I know you are angry with me about what has happened at your birthday party. I wish to apologize and I want you to forgive me. I don't our friendship to spoil.\n\nI know whatever has happened was not right. The thing is I was not in a mood that day. My exams were not good and my mother really scolded me. I shouldn't have behaved with you like that. I promise not to behave like that the next time. I am really sorry about what I said.\n\nHope you pardon me for my mistakes. Let's meet if possible! Eagerly waiting for your response!\n\nWith love,\nYours truly,\nWasim.",
    },
    { text: "input: who are you?" },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
}

run();

export default run;
