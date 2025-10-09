// MP data and functionality
let currentMP = null;
let selectedTopic = null;
let selectedTemplate = 0;
let selectedSignoff = 0;

// Email templates with multiple options
const emailTemplates = {
    osa: {
        templates: [
            {
                name: "Data Breach Focus",
                subject: "Urgent: Concerns about the Online Safety Act and Recent Data Breaches",
                body: `Dear [MP_FIRST_NAME],

I'm writing to you as one of your constituents because I'm worried about the Online Safety Act and what it means for our digital rights and privacy.

The recent Discord data breach that exposed age verification documents from over 70,000 users shows a real problem: the Online Safety Act forces companies to collect more personal data, creating bigger targets for hackers.

My main concerns are:

1. Recent Data Breaches: The October 2025 Discord breach exposed age verification IDs and personal data from over 70,000 users. When you force companies to collect everyone's data in one place, hackers will target it. The Online Safety Act requires companies to collect and retain more user data for compliance, making the problem worse.

2. Privacy vs Safety Trade-off: The Act focuses on controlling what people can say online, not on keeping our data safe. Real online safety would mean protecting our personal information, not building massive surveillance systems that hackers can break into.

3. Poor Government Response: When 548,408 people signed petition 722903 asking for changes, the government's response didn't address our worries about data security and privacy at all.

4. Free Speech Concerns: The Act's vague language and harsh penalties mean platforms will delete perfectly legal content just to be safe. This hurts free speech and open discussion.

Please could you:
- Ask for the Online Safety Act to be reviewed, especially after these data breaches
- Support changes that put data protection and user privacy first
- Push for proper oversight that we can actually see and understand
- Make sure online safety laws don't take away our basic rights

As my MP, I hope you'll take this seriously and help make sure any online safety laws actually protect us without taking away our privacy and freedoms.

[SIGNOFF]`
            },
            {
                name: "Free Speech Focus",
                subject: "Protecting Free Speech: Concerns about the Online Safety Act",
                body: `Dear [MP_FIRST_NAME],

I'm one of your constituents and I'm really worried about how the Online Safety Act is damaging free speech in the UK.

The Act uses such vague language and threatens such huge fines that social media companies are deleting perfectly legal posts just to avoid getting in trouble. This is killing free speech online.

Here's what's going wrong:

1. Vague Language: Nobody knows what "harmful content" actually means, so platforms just delete anything that might be controversial.

2. Robot Censors: Platforms use AI that can't understand jokes, satire, or context. It just deletes first and asks questions later.

3. Political Speech at Risk: The Act makes it dangerous to discuss politics, report wrongdoing, or do journalism - the very things democracy needs to work.

4. Ignored Petition: 548,408 people signed petition 722903 about these problems, but the government's response completely ignored our free speech worries.

I ask you to:
- Champion amendments that protect lawful speech
- Ensure clear, narrow definitions of genuinely illegal content
- Advocate for human review of content decisions
- Protect whistleblowers and journalists from overreach

Free speech is not a luxury but a fundamental right. Please ensure the Online Safety Act doesn't sacrifice this right in the name of safety.

[SIGNOFF]`
            },
            {
                name: "Business & Innovation Focus",
                subject: "Online Safety Act: Threat to UK Digital Innovation",
                body: `Dear [MP_FIRST_NAME],

I'm a constituent who's concerned about our digital economy, and I need to tell you about the damage the Online Safety Act is doing to UK innovation and small businesses.

The Act places impossible burdens on UK startups and small platforms, creating barriers that only tech giants can overcome. This consolidates power among Big Tech while crushing British innovation.

Critical business impacts:

1. Compliance Costs: Ofcom estimates compliance costs could reach £2.3 billion across the industry, with small platforms facing disproportionate burdens making UK tech startups unviable.

2. Legal Uncertainty: Vague requirements create liability risks that investors and innovators cannot accept.

3. Brain Drain: Tech talent is fleeing to jurisdictions with clearer, fairer regulations.

4. Competitive Disadvantage: UK platforms cannot compete globally while bearing these unique regulatory burdens.

5. Petition Response: The government ignored these economic concerns in responding to petition 722903 signed by 548,408 people.

Please act to:
- Create exemptions for small platforms and startups
- Clarify requirements to reduce legal uncertainty
- Consider the economic impact on UK tech sector
- Ensure UK remains competitive in digital markets

The UK should lead in digital innovation, not regulate it out of existence. Please help save our digital economy.

[SIGNOFF]`
            }
        ]
    },
    digitalid: {
        templates: [
            {
                name: "Privacy & Surveillance Focus",
                subject: "Concerns about Digital ID Proposals - Privacy and Civil Liberties",
                body: `Dear [MP_FIRST_NAME],

I'm writing as your constituent because I have serious concerns about the proposed Digital ID system for the UK.

When 2,847,345 people signed petition 730194 about Digital IDs, the government's response didn't properly address our concerns. We need to take this seriously.

The main problems are:

1. Privacy and Data Protection: Digital IDs create a single point of failure for personal data. The recent Discord breach that exposed age verification IDs from over 70,000 users shows that no system is immune to hacking. A centralised ID system would be an irresistible target for cybercriminals and hostile states.

2. Scope Creep: History shows that ID systems expand beyond their initial purpose. What starts as "voluntary" and "limited" inevitably becomes mandatory and all-encompassing.

3. Exclusion and Discrimination: Digital ID systems risk excluding vulnerable populations who lack digital access or literacy, creating a two-tier society.

4. Lack of Transparency: The petition response provided no concrete details about:
   - Data retention policies
   - Third-party access
   - Opt-out provisions
   - Safeguards against misuse

5. International Concerns: Recent breaches and misuse of digital ID systems worldwide demonstrate how they can enable mass surveillance and social control.

I urge you to:
- Demand full transparency about any Digital ID proposals
- Ensure robust parliamentary scrutiny before any implementation
- Protect the right to anonymity and cash transactions
- Guarantee that any system remains genuinely voluntary
- Establish strong legal protections against function creep

[SIGNOFF]`
            },
            {
                name: "Technical Vulnerabilities Focus",
                subject: "Digital ID Security Risks: Learning from Recent Failures",
                body: `Dear [MP_FIRST_NAME],

I'm your constituent and I work in tech, so I'm writing about the serious security problems with the proposed UK Digital ID system.

Recent cyberattacks demonstrate that no system is secure. A centralised ID system would be a catastrophic single point of failure for millions of citizens' data.

Technical concerns include:

1. Biometric Data Risks: Once biometric data is compromised, it cannot be changed like passwords. Recent breaches of ID verification systems show this risk is real.

2. Infrastructure Vulnerabilities: Current breaches show our infrastructure's weakness. A Digital ID system would be an even more attractive target.

3. Recent Examples: The October 2025 Discord breach exposed age verification documents from over 70,000 users, showing how ID systems create honeypots for attackers.

4. Supply Chain Attacks: Modern cyberattacks target the weakest link in any system, and centralised ID systems have many potential vulnerabilities.

5. Petition 730194: Technical experts' warnings in this petition signed by 2,847,345 people were dismissed without addressing specific vulnerabilities.

I urge you to:
- Demand independent security audits before any implementation
- Require decentralised architecture to prevent single points of failure
- Ensure data minimisation principles are followed
- Mandate regular penetration testing and public reporting

Please don't let the UK repeat other nations' Digital ID disasters.

[SIGNOFF]`
            },
            {
                name: "Social Exclusion Focus",
                subject: "Digital IDs Will Exclude Our Most Vulnerable Citizens",
                body: `Dear [MP_FIRST_NAME],

I'm your constituent and I'm really concerned that Digital ID proposals will leave behind the most vulnerable people in our community.

Not everyone can or should be forced to adopt digital technology. A Digital ID system would create a two-tier society where the most vulnerable are locked out of essential services.

Those most affected include:

1. Elderly Citizens: Many lack digital skills or internet access. They shouldn't lose access to services they've used for decades.

2. Disabled People: Not all disabilities are compatible with digital systems. Alternative access must be guaranteed, not just promised.

3. Economically Disadvantaged: Not everyone can afford smartphones or reliable internet. Digital ID requirements would deepen inequality.

4. Victims of Abuse: Survivors of domestic violence often need to maintain anonymity for safety. Digital IDs threaten their security.

5. Rural Communities: Poor internet connectivity makes digital-only systems unworkable in many areas.

The petition 730194 raised these concerns, signed by 2,847,345 people, but the government's response showed no understanding of these real-world impacts.

Please ensure:
- Non-digital alternatives remain permanently available
- No one loses access to existing services
- Vulnerable groups are consulted before any implementation
- Equality impact assessments are published and acted upon

A fair society doesn't leave anyone behind.

[SIGNOFF]`
            }
        ]
    },
    combined: {
        templates: [
            {
                name: "Combined Concerns - Privacy Focus",
                subject: "Urgent: Online Safety Act and Digital ID Threats to Privacy",
                body: `Dear [MP_FIRST_NAME],

I'm writing as your constituent about two connected issues that threaten our privacy and digital rights: the Online Safety Act and proposed Digital ID systems.

The recent Discord data breach that exposed age verification documents from over 70,000 users perfectly illustrates why both policies are dangerous. The Online Safety Act forces companies to collect more data, while Digital ID proposals would centralise our most sensitive information - creating massive targets for hackers.

Key concerns about both policies:

1. Data Collection Overreach: The Online Safety Act requires extensive data retention, while Digital IDs would centralise biometric and personal data. Together, they create unprecedented surveillance infrastructure.

2. Security Risks: The Discord breach of over 70,000 users shows how age verification systems fail. Imagine the damage when hackers target a centralised Digital ID database containing everyone's biometric data.

3. Democratic Deficit: 548,408 people signed petition 722903 about the Online Safety Act, and 2,847,345 signed petition 730194 about Digital IDs. The government ignored both.

4. Function Creep: Both systems will expand beyond stated purposes. What starts as "child safety" and "convenience" becomes mass surveillance.

5. Economic Impact: Small businesses face billions in compliance costs while vulnerable citizens risk digital exclusion.

Please act to:
- Oppose Digital ID implementation until privacy concerns are addressed
- Demand Online Safety Act amendments protecting privacy
- Ensure parliamentary scrutiny of all surveillance proposals
- Protect citizens' rights to privacy and anonymity

These aren't separate issues - they're part of a concerning trend towards mass surveillance. Please stand up for your constituents' digital rights.

[SIGNOFF]`
            },
            {
                name: "Combined Concerns - Freedom Focus", 
                subject: "Digital Freedom Under Attack: Online Safety Act and Digital IDs",
                body: `Dear [MP_FIRST_NAME],

I'm your constituent writing about how the Online Safety Act and Digital ID proposals together threaten our fundamental freedoms.

These aren't isolated policies - they're building blocks of a surveillance state that would make the UK unrecognisable.

The combined threat:

1. Speech Control + Identity Tracking: The Online Safety Act already censors legal speech. Add mandatory Digital IDs, and anonymous free speech dies completely. Whistleblowers, activists, and journalists would be silenced.

2. Recent Evidence: October's Discord breach exposed age verification documents from over 70,000 users. This proves that forcing identity verification online creates security disasters and privacy violations.

3. Massive Public Opposition: Together, petitions against these policies gathered over 3.4 million signatures - 548,408 for petition 722903 and 2,847,345 for petition 730194. The government dismisses us all.

4. Chilling Effect: People self-censor when they know they're being watched. Combining speech regulation with identity verification destroys open democratic discourse.

5. No Escape: Unlike in authoritarian countries, we can't use VPNs or anonymity tools if Digital IDs are required for UK services.

I urgently ask you to:
- Vote against any Digital ID legislation
- Support Online Safety Act amendments protecting anonymity
- Defend the right to private, anonymous communication
- Recognise these policies as the authoritarian threats they are

The UK must remain a free society where people can speak, associate, and live without constant surveillance. Please act before it's too late.

[SIGNOFF]`
            }
        ]
    }
};
// Sign-off options
const signOffOptions = [
    {
        name: "Formal",
        text: `I look forward to your response on this critical matter.

Yours sincerely,
[YOUR_NAME]
[YOUR_ADDRESS]`
    },
    {
        name: "Urgent",
        text: `This matter requires urgent attention, and I eagerly await your response detailing what action you will take.

Yours sincerely,
[YOUR_NAME]
[YOUR_ADDRESS]`
    },
    {
        name: "Constituent Focus",
        text: `As one of your constituents, I trust you will represent my concerns in Parliament and keep me informed of your actions on this matter.

Yours sincerely,
[YOUR_NAME]
[YOUR_ADDRESS]`
    },
    {
        name: "Action Oriented",
        text: `I would appreciate a detailed response outlining the specific actions you will take to address these concerns in Parliament.

With best regards,
[YOUR_NAME]
[YOUR_ADDRESS]`
    },
    {
        name: "Democratic Appeal",
        text: `In our democracy, I trust you will give these concerns the serious consideration they deserve and represent your constituents' interests.

Respectfully,
[YOUR_NAME]
[YOUR_ADDRESS]`
    }
];

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    document.getElementById('findMpBtn').addEventListener('click', findMP);
    document.getElementById('postcode').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') findMP();
    });

    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('click', () => selectTopic(card.dataset.topic));
    });

    document.getElementById('copyEmailBtn').addEventListener('click', copyEmail);
    document.getElementById('mailtoBtn').addEventListener('click', openMailClient);

    // Template and signoff selection
    document.getElementById('templateSelect').addEventListener('change', updateEmailContent);
    document.getElementById('signoffSelect').addEventListener('change', updateEmailContent);

    // Dark mode toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Initialize theme
    initializeTheme();
});

// Find MP function
async function findMP() {
    const postcode = document.getElementById('postcode').value.trim();
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('mpResult');
    
    // Hide previous results/errors
    errorDiv.classList.add('hidden');
    resultDiv.classList.add('hidden');
    
    if (!postcode) {
        showError('Please enter a postcode');
        return;
    }
    
    // Format postcode - ensure proper spacing
    const cleanPostcode = postcode.toUpperCase().replace(/\s/g, '');
    let formattedPostcode = cleanPostcode;
    
    // Add space for UK postcode format
    if (cleanPostcode.length >= 5) {
        formattedPostcode = cleanPostcode.slice(0, -3) + ' ' + cleanPostcode.slice(-3);
    }
    
    try {
        // Show loading state
        resultDiv.innerHTML = '<p>Searching for your MP...</p>';
        resultDiv.classList.remove('hidden');
        
        // Try MPs API directly first with proper postcode formatting
        const apiUrl = `https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${encodeURIComponent(formattedPostcode)}&skip=0&take=10`;
        
        // Searching for postcode
        
        // Try multiple CORS proxies in case one is down
        const corsProxies = [
            url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
            url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
            url => `https://cors.bridged.cc/${url}`,
            url => `https://cors-anywhere.herokuapp.com/${url}`,
            url => `https://thingproxy.freeboard.io/fetch/${url}`,
            url => `https://yacdn.org/proxy/${url}`,
            url => `https://cors.eu.org/${url}`
        ];
        
        let response = null;
        let lastError = null;
        
        // Try each proxy until one works
        for (const proxyFormatter of corsProxies) {
            try {
                const proxyUrl = proxyFormatter(apiUrl);
                // Trying proxy
                response = await fetch(proxyUrl);
                
                if (response.ok) {
                    break; // Success! Exit the loop
                }
            } catch (error) {
                // Proxy failed
                lastError = error;
            }
        }
        
        if (!response || !response.ok) {
            throw new Error('All CORS proxies failed. Please try again later.');
        }
        
        const responseText = await response.text();
        // Processing response
        
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            // Failed to parse response
            throw new Error('Invalid response from MP lookup service');
        }
        // Processing API response
        
        if (data.items && data.items.length > 0) {
            // Get the first constituency result - it already contains MP info!
            const constituency = data.items[0];
            
            // Check if there's current representation
            if (constituency.value.currentRepresentation && constituency.value.currentRepresentation.member) {
                const mp = constituency.value.currentRepresentation.member.value;
                
                // Extract first name from display name
                const nameParts = mp.nameDisplayAs.split(' ');
                let firstName = nameParts[0];
                // Skip titles like Ms, Mr, Dr, Sir, Dame
                if (['Ms', 'Mr', 'Mrs', 'Dr', 'Sir', 'Dame', 'Lord', 'Lady', 'Rt', 'Hon'].includes(firstName)) {
                    firstName = nameParts.find(part => !['Ms', 'Mr', 'Mrs', 'Dr', 'Sir', 'Dame', 'Lord', 'Lady', 'Rt', 'Hon', 'Hon.'].includes(part)) || nameParts[1];
                }
                
                // Format email correctly: firstname.lastname.mp@parliament.uk
                const emailName = mp.nameListAs.toLowerCase()
                    .replace(',', '') // Remove comma
                    .split(' ')
                    .reverse() // nameListAs is "Lastname, Firstname" so reverse it
                    .join('.');
                
                currentMP = {
                    name: mp.nameDisplayAs,
                    firstName: firstName,
                    constituency: constituency.value.name,
                    party: mp.latestParty.name,
                    email: `${emailName}.mp@parliament.uk`,
                    id: mp.id
                };
                
                // Found MP
                displayMP(currentMP);
            } else {
                throw new Error('No current MP found for this constituency');
            }
        } else {
            showError('No MP found for this postcode. Please check and try again.');
        }
    } catch (error) {
        // Error finding MP
        // If Parliament API fails, try alternative approach
        try {
            // Use TheyWorkForYou API as fallback
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const apiUrl = `https://www.theyworkforyou.com/api/getMP?key=demo&postcode=${formattedPostcode}&output=js`;
            const fallbackResponse = await fetch(proxyUrl + encodeURIComponent(apiUrl));
            
            if (fallbackResponse.ok) {
                const mpData = await fallbackResponse.json();
                if (mpData && mpData.full_name) {
                    // Extract first name from full name
                    const nameParts = mpData.full_name.split(' ');
                    let firstName = nameParts[0];
                    // Skip titles
                    if (['Ms', 'Mr', 'Mrs', 'Dr', 'Sir', 'Dame', 'Lord', 'Lady', 'Rt', 'Hon'].includes(firstName)) {
                        firstName = nameParts.find(part => !['Ms', 'Mr', 'Mrs', 'Dr', 'Sir', 'Dame', 'Lord', 'Lady', 'Rt', 'Hon', 'Hon.'].includes(part)) || nameParts[1];
                    }
                    
                    currentMP = {
                        name: mpData.full_name,
                        firstName: firstName,
                        constituency: mpData.constituency,
                        party: mpData.party,
                        email: `${mpData.full_name.toLowerCase().replace(/\s/g, '.')}.mp@parliament.uk`,
                        id: mpData.person_id
                    };
                    displayMP(currentMP);
                    return;
                }
            }
        } catch (fallbackError) {
            // Fallback API also failed
        }
        showError('Unable to connect to MP lookup service. This is usually temporary - please try again in a moment. If the problem persists, you can find your MP at: https://members.parliament.uk/FindYourMP');
    }
}

// Display MP information
function displayMP(mp) {
    const resultDiv = document.getElementById('mpResult');
    resultDiv.innerHTML = `
        <h3>Your MP</h3>
        <div class="mp-info">
            <p><strong>${mp.name}</strong></p>
            <p>${mp.party}</p>
            <p>${mp.constituency}</p>
            <p>Email: ${mp.email}</p>
        </div>
    `;
    resultDiv.classList.remove('hidden');
    
    // Enable topic selection
    document.querySelectorAll('.topic-card').forEach(card => {
        card.classList.add('clickable');
    });
}

// Select topic and show email form
function selectTopic(topic) {
    if (!currentMP) {
        showError('Please find your MP first');
        return;
    }
    
    selectedTopic = topic;
    selectedTemplate = 0;
    
    // Highlight selected topic
    document.querySelectorAll('.topic-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.topic === topic);
    });
    
    // Populate template dropdown
    const templateSelect = document.getElementById('templateSelect');
    templateSelect.innerHTML = '';
    emailTemplates[topic].templates.forEach((template, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = template.name;
        templateSelect.appendChild(option);
    });
    
    // Populate signoff dropdown
    const signoffSelect = document.getElementById('signoffSelect');
    if (signoffSelect.options.length === 0) {
        signOffOptions.forEach((signoff, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = signoff.name;
            signoffSelect.appendChild(option);
        });
    }
    
    // Update email content
    updateEmailContent();
    
    // Show email section
    document.getElementById('emailSection').classList.remove('hidden');
    document.getElementById('emailSection').scrollIntoView({ behavior: 'smooth' });
}

// Update email content based on selected template and signoff
function updateEmailContent() {
    if (!selectedTopic || !currentMP) return;
    
    const templateIndex = document.getElementById('templateSelect').value || 0;
    const signoffIndex = document.getElementById('signoffSelect').value || 0;
    
    selectedTemplate = templateIndex;
    selectedSignoff = signoffIndex;
    
    const template = emailTemplates[selectedTopic].templates[templateIndex];
    const signoff = signOffOptions[signoffIndex].text;
    
    // Update subject
    document.getElementById('emailSubject').value = template.subject;
    
    // Update body with signoff
    const bodyWithSignoff = template.body.replace('[SIGNOFF]', signoff);
    document.getElementById('emailBody').value = bodyWithSignoff
        .replace(/\[MP_NAME\]/g, currentMP.name)
        .replace(/\[MP_FIRST_NAME\]/g, currentMP.firstName)
        .replace('[YOUR_NAME]', '')
        .replace('[YOUR_ADDRESS]', '');
}

// Copy email to clipboard
async function copyEmail() {
    const subject = document.getElementById('emailSubject').value;
    const body = document.getElementById('emailBody').value;
    const senderName = document.getElementById('senderName').value;
    const senderAddress = document.getElementById('senderAddress').value;
    
    // Replace placeholders
    let finalBody = body
        .replace('[YOUR_NAME]', senderName)
        .replace('[YOUR_ADDRESS]', senderAddress);
    
    const emailText = `To: ${currentMP.email}\nSubject: ${subject}\n\n${finalBody}`;
    
    try {
        await navigator.clipboard.writeText(emailText);
        const successDiv = document.getElementById('copySuccess');
        successDiv.classList.remove('hidden');
        setTimeout(() => successDiv.classList.add('hidden'), 3000);
    } catch (err) {
        showError('Failed to copy email. Please try again.');
    }
}

// Open in email client
function openMailClient() {
    const subject = encodeURIComponent(document.getElementById('emailSubject').value);
    const body = document.getElementById('emailBody').value;
    const senderName = document.getElementById('senderName').value;
    const senderAddress = document.getElementById('senderAddress').value;
    
    // Replace placeholders
    let finalBody = body
        .replace('[YOUR_NAME]', senderName)
        .replace('[YOUR_ADDRESS]', senderAddress);
    
    const mailtoLink = `mailto:${currentMP.email}?subject=${subject}&body=${encodeURIComponent(finalBody)}`;
    window.location.href = mailtoLink;
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Dark mode functions
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}