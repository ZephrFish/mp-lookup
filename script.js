// MP data and functionality
let currentMP = null;
let selectedTopic = null;

// Email templates
const emailTemplates = {
    osa: {
        subject: "Urgent: Concerns about the Online Safety Act and Recent Data Breaches",
        body: `Dear [MP_NAME],

I am writing to you as one of your constituents to express my serious concerns about the Online Safety Act and its implications for digital rights and privacy in the UK.

The recent data breaches at Discord and other major online platforms highlight a critical issue: while the Online Safety Act grants unprecedented powers to monitor and control online content, it does little to protect citizens from the real threats they face online - namely, data breaches and privacy violations.

Key concerns:

1. **Recent Data Breaches**: The Discord breach exposed millions of users' personal data, demonstrating that centralised data collection creates honeypots for cybercriminals. The Online Safety Act's requirements for increased data collection and monitoring only exacerbate this risk.

2. **Privacy vs Safety Trade-off**: The Act prioritises content control over genuine user safety. Real online safety means protecting users' data and privacy, not creating vast surveillance systems vulnerable to breaches.

3. **Inadequate Government Response**: The petition (722903) calling for reconsideration of the Act received an insufficient response that failed to address these fundamental concerns about data security and privacy.

4. **Chilling Effect on Free Speech**: The Act's broad definitions and heavy penalties create uncertainty that stifles legitimate discourse and innovation.

I urge you to:
- Call for a review of the Online Safety Act in light of recent data breaches
- Advocate for amendments that prioritise data protection and user privacy
- Push for transparent oversight mechanisms
- Ensure that online safety measures don't compromise fundamental rights

As my representative in Parliament, I hope you will take these concerns seriously and work to ensure that any online safety legislation truly protects citizens without sacrificing our privacy and freedoms.

I look forward to your response on this critical matter.

Yours sincerely,
[YOUR_NAME]
[YOUR_ADDRESS]`
    },
    digitalid: {
        subject: "Concerns about Digital ID Proposals - Privacy and Civil Liberties",
        body: `Dear [MP_NAME],

I am writing as your constituent to express my deep concerns about the proposed Digital ID system for the UK.

The government's response to petition 730194 regarding Digital IDs was inadequate and failed to address the fundamental concerns raised by over 18,000 citizens. Given the UK's history with failed ID schemes and recent global examples of digital ID misuse, these concerns deserve serious consideration.

Critical issues that require addressing:

1. **Privacy and Data Protection**: Digital IDs create a single point of failure for personal data. Recent breaches at major tech companies show that no system is immune to hacking. A centralised ID system would be an irresistible target for cybercriminals and hostile states.

2. **Scope Creep**: History shows that ID systems expand beyond their initial purpose. What starts as "voluntary" and "limited" inevitably becomes mandatory and all-encompassing.

3. **Exclusion and Discrimination**: Digital ID systems risk excluding vulnerable populations who lack digital access or literacy, creating a two-tier society.

4. **Lack of Transparency**: The petition response provided no concrete details about:
   - Data retention policies
   - Third-party access
   - Opt-out provisions
   - Safeguards against misuse

5. **International Concerns**: Countries like India (Aadhaar) and China have demonstrated how digital IDs can enable mass surveillance and social control.

I urge you to:
- Demand full transparency about any Digital ID proposals
- Ensure robust parliamentary scrutiny before any implementation
- Protect the right to anonymity and cash transactions
- Guarantee that any system remains genuinely voluntary
- Establish strong legal protections against function creep

The UK must learn from both our own past mistakes and international experiences. We must not sleepwalk into a surveillance state under the guise of convenience.

I await your response and assurance that you will defend our civil liberties in Parliament.

Yours sincerely,
[YOUR_NAME]
[YOUR_ADDRESS]`
    }
};

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
    
    // Format postcode
    const formattedPostcode = postcode.toUpperCase().replace(/\s/g, '');
    
    try {
        // Using the Parliament API
        const response = await fetch(`https://members-api.parliament.uk/api/Members/Search?PostCode=${formattedPostcode}&IsCurrentMember=true&House=Commons`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch MP data');
        }
        
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const mp = data.items[0].value;
            currentMP = {
                name: mp.nameDisplayAs,
                constituency: mp.latestHouseMembership.membershipFrom,
                party: mp.latestParty.name,
                email: `${mp.nameAddressAs.toLowerCase().replace(/\s/g, '.')}@parliament.uk`,
                id: mp.id
            };
            
            displayMP(currentMP);
        } else {
            showError('No MP found for this postcode. Please check and try again.');
        }
    } catch (error) {
        console.error('Error finding MP:', error);
        showError('Unable to find MP. Please check your postcode and try again.');
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
    
    // Highlight selected topic
    document.querySelectorAll('.topic-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.topic === topic);
    });
    
    // Populate email form
    const template = emailTemplates[topic];
    document.getElementById('emailSubject').value = template.subject;
    document.getElementById('emailBody').value = template.body
        .replace('[MP_NAME]', currentMP.name)
        .replace('[YOUR_NAME]', '')
        .replace('[YOUR_ADDRESS]', '');
    
    // Show email section
    document.getElementById('emailSection').classList.remove('hidden');
    document.getElementById('emailSection').scrollIntoView({ behavior: 'smooth' });
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

// Handle MP name formatting for email
function formatMPEmail(name) {
    // This is a simplified version - in reality, MP emails can vary
    return name.toLowerCase()
        .replace(/\s+/g, '.')
        .replace(/[^a-z0-9.]/g, '') + '@parliament.uk';
}