/**
 * SMART INSURANCE OS - MOBILE MULTI-APP & SWITCHER ENGINE
 * Multitasking, Recents Carousel (Screenshot 2), and Standalone Mini-Apps
 */

// Global OS State
let runningApps = ['claims', 'investment', 'clients']; // Initial running apps for demonstration
let activeAppId = 'claims'; // Start with Claim app open or Home
let isAppSwitcherOpen = false;

// App Meta Registry
const APP_REGISTRY = {
  claims: {
    id: 'claims',
    name: 'Claim Center',
    icon: 'fa-file-medical',
    gradient: 'bg-gradient-red',
    color: '#ef4444',
    summary: '14 Active Claims • ₹18.6L Settled'
  },
  investment: {
    id: 'investment',
    name: 'Investment & SIP',
    icon: 'fa-chart-line',
    gradient: 'bg-gradient-teal',
    color: '#0d9488',
    summary: 'AUM: ₹3.85 Cr • 318 Active SIPs'
  },
  life: {
    id: 'life',
    name: 'Life Insurance',
    icon: 'fa-heart-pulse',
    gradient: 'bg-gradient-rose',
    color: '#f43f5e',
    summary: '520 Active Policies • ₹120 Cr Covered'
  },
  general: {
    id: 'general',
    name: 'General Ins',
    icon: 'fa-car-side',
    gradient: 'bg-gradient-amber',
    color: '#f59e0b',
    summary: '395 Motor, Health & Commercial Policies'
  },
  clients: {
    id: 'clients',
    name: 'Client CRM',
    icon: 'fa-users',
    gradient: 'bg-gradient-blue',
    color: '#2563eb',
    summary: '1,428 Registered Clients & Families'
  },
  commission: {
    id: 'commission',
    name: 'Commission',
    icon: 'fa-indian-rupee-sign',
    gradient: 'bg-gradient-emerald',
    color: '#10b981',
    summary: 'Nov Payout: ₹2,84,500 • TDS Slip'
  },
  reports: {
    id: 'reports',
    name: 'Reports & MIS',
    icon: 'fa-chart-pie',
    gradient: 'bg-gradient-indigo',
    color: '#6366f1',
    summary: 'MDRT Target 78% • Business MIS'
  },
  documents: {
    id: 'documents',
    name: 'Document Vault',
    icon: 'fa-folder-closed',
    gradient: 'bg-gradient-yellow',
    color: '#ca8a04',
    summary: '915 Policy Bonds & 1,428 KYC Docs'
  },
  smartconnect: {
    id: 'smartconnect',
    name: 'Smart Connect',
    icon: 'fa-brands fa-whatsapp',
    gradient: 'bg-gradient-green',
    color: '#22c55e',
    summary: 'WhatsApp Automation & Reminders'
  },
  subagent: {
    id: 'subagent',
    name: 'Sub Agent',
    icon: 'fa-network-wired',
    gradient: 'bg-gradient-purple',
    color: '#9333ea',
    summary: '16 POSP Agents & Hierarchy'
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    icon: 'fa-gear',
    gradient: 'bg-gradient-slate',
    color: '#475569',
    summary: 'Agency AGY-884012 • Preferences'
  },
  alteration: {
    id: 'alteration',
    name: 'Alteration',
    icon: 'fa-pen-ruler',
    gradient: 'bg-gradient-orange',
    color: '#ea580c',
    summary: 'Policy endorsements & nomination changes'
  }
};

// Sample Database
let claimsData = [
  {
    id: "CLM-9041",
    client: "Manishbhai Desai",
    company: "Care Health",
    type: "cashless",
    hospital: "Zydus Hospital, Ahmedabad",
    amount: "₹1,50,000",
    status: "Approved",
    date: "Today, 11:30 AM"
  },
  {
    id: "CLM-8812",
    client: "Suresh Patel",
    company: "ICICI Lombard",
    type: "motor",
    hospital: "Hyundai Workshop, Surat",
    amount: "₹48,000",
    status: "Surveyor Appointed",
    date: "Yesterday"
  },
  {
    id: "CLM-7619",
    client: "Rajeshbhai Patel",
    company: "HDFC Life",
    type: "cashless",
    hospital: "Apollo Hospitals",
    amount: "₹95,000",
    status: "In Process",
    date: "22 Nov 2026"
  },
  {
    id: "CLM-6502",
    client: "Bhavik Shah",
    company: "Star Health",
    type: "cashless",
    hospital: "CIMS Hospital",
    amount: "₹2,10,000",
    status: "Approved",
    date: "20 Nov 2026"
  }
];

let portfolioData = [
  {
    fundName: "Parag Parikh Flexi Cap Fund",
    category: "Flexi Cap Equity",
    aum: "₹1,12,40,000",
    sipCount: 94,
    xirr: "+24.8%",
    color: "#0d9488"
  },
  {
    fundName: "Nippon India Small Cap Fund",
    category: "Small Cap Equity",
    aum: "₹92,80,000",
    sipCount: 76,
    xirr: "+31.2%",
    color: "#2563eb"
  },
  {
    fundName: "SBI Bluechip Fund (Large Cap)",
    category: "Large Cap",
    aum: "₹78,50,000",
    sipCount: 68,
    xirr: "+18.6%",
    color: "#4f46e5"
  },
  {
    fundName: "ICICI Prudential Balanced Advantage",
    category: "Hybrid Dynamic",
    aum: "₹64,20,000",
    sipCount: 52,
    xirr: "+16.2%",
    color: "#ea580c"
  }
];

let clientsData = [
  {
    id: "CL-101",
    name: "Rajeshbhai Patel",
    city: "Ahmedabad",
    phone: "+91 98250 12345",
    type: "HNI",
    policies: 4,
    totalSumAssured: "₹1.50 Cr",
    annualPremium: "₹84,500"
  },
  {
    id: "CL-102",
    name: "Sureshkumar Mehta",
    city: "Surat",
    phone: "+91 94280 67890",
    type: "Retail",
    policies: 2,
    totalSumAssured: "₹45.00 Lakh",
    annualPremium: "₹38,200"
  },
  {
    id: "CL-103",
    name: "Dharmesh Shah",
    city: "Vadodara",
    phone: "+91 98980 11223",
    type: "HNI",
    policies: 6,
    totalSumAssured: "₹3.20 Cr",
    annualPremium: "₹2,10,000"
  },
  {
    id: "CL-104",
    name: "Pooja Ben Joshi",
    city: "Rajkot",
    phone: "+91 97240 55667",
    type: "Retail",
    policies: 3,
    totalSumAssured: "₹75.00 Lakh",
    annualPremium: "₹52,000"
  }
];

let lifePoliciesData = [
  {
    plan: "HDFC Life Click 2 Protect Super",
    client: "Rajeshbhai Patel",
    category: "term",
    sumAssured: "₹1,00,00,000",
    premium: "₹28,450/yr",
    company: "HDFC Life",
    status: "Due in 2 days"
  },
  {
    plan: "LIC Jeevan Labh (Table 936)",
    client: "Pooja Ben Joshi",
    category: "endowment",
    sumAssured: "₹25,00,000",
    premium: "₹34,800/yr",
    company: "LIC of India",
    status: "Active"
  },
  {
    plan: "Max Life Smart Wealth Plan",
    client: "Dharmesh Shah",
    category: "endowment",
    sumAssured: "₹50,00,000",
    premium: "₹1,00,000/yr",
    company: "Max Life",
    status: "Active"
  }
];

let generalPoliciesData = [
  {
    plan: "Star Health Comprehensive (10L Floater)",
    client: "Sureshkumar Mehta",
    category: "health",
    sumAssured: "₹10,00,000",
    premium: "₹19,200/yr",
    company: "Star Health",
    status: "Due in 4 days"
  },
  {
    plan: "ICICI Lombard Private Car (Creta)",
    client: "Rajeshbhai Patel",
    category: "motor",
    sumAssured: "IDV ₹11.5L",
    premium: "₹18,400/yr",
    company: "ICICI Lombard",
    status: "Active"
  },
  {
    plan: "Standard Fire & Special Perils",
    client: "Manishbhai Desai",
    category: "fire",
    sumAssured: "₹1,20,00,000",
    premium: "₹24,500/yr",
    company: "Bajaj Allianz",
    status: "Active"
  }
];

// Initialize System on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  setupDesktopControls();
  renderClaimsFeed(claimsData);
  renderPortfolios();
  renderClientsApp(clientsData);
  renderLifeFeed();
  renderGeneralFeed();
  renderSubAgents();

  // Start with Claim App open to demonstrate active multi-tasking
  openApp('claims');
});

// Real-time Clock
function initClock() {
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeStr = `${hours}:${minutes}`;
    const statusTimeEl = document.getElementById('statusTime');
    const homeLargeClock = document.getElementById('homeLargeClock');
    
    if (statusTimeEl) statusTimeEl.textContent = timeStr;
    if (homeLargeClock) homeLargeClock.textContent = timeStr;
  }
  setInterval(updateTime, 1000);
  updateTime();
}

// Setup Desktop Top Bar Controls
function setupDesktopControls() {
  const btnPhoneFrame = document.getElementById('btnPhoneFrame');
  const btnFullResponsive = document.getElementById('btnFullResponsive');
  const btnQuickSwitcher = document.getElementById('btnQuickSwitcher');

  if (btnPhoneFrame && btnFullResponsive) {
    btnPhoneFrame.addEventListener('click', () => {
      document.body.classList.remove('full-responsive-mode');
      btnPhoneFrame.classList.add('active');
      btnFullResponsive.classList.remove('active');
      showToast('Switched to Phone Mockup View');
    });

    btnFullResponsive.addEventListener('click', () => {
      document.body.classList.add('full-responsive-mode');
      btnFullResponsive.classList.add('active');
      btnPhoneFrame.classList.remove('active');
      showToast('Switched to Full Screen View');
    });
  }

  if (btnQuickSwitcher) {
    btnQuickSwitcher.addEventListener('click', () => {
      toggleAppSwitcher();
    });
  }
}

// ==========================================================================
// OS MULTI-APP LIFECYCLE & MULTITASKING SWITCHER
// ==========================================================================

// Launch / Open an App
function openApp(appId) {
  // If app is not in running list, add it
  if (!runningApps.includes(appId)) {
    runningApps.push(appId);
  }

  activeAppId = appId;

  // Close app switcher if open
  closeAppSwitcher();

  // Deactivate all app windows
  document.querySelectorAll('.app-window').forEach(win => {
    win.classList.remove('active');
  });

  // Activate target app window
  const targetWin = document.getElementById(`appWindow-${appId}`);
  if (targetWin) {
    targetWin.classList.add('active');
  }

  const appMeta = APP_REGISTRY[appId];
  if (appMeta) {
    showToast(`Switched to ${appMeta.name}`);
  }
}

// Toggle App Switcher / Recents Screen (Exact Screenshot 2 behavior)
function toggleAppSwitcher() {
  if (isAppSwitcherOpen) {
    closeAppSwitcher();
  } else {
    openAppSwitcher();
  }
}

function openAppSwitcher() {
  isAppSwitcherOpen = true;
  const switcher = document.getElementById('recentsSwitcherOverlay');
  if (!switcher) return;

  renderRecentsCards();
  switcher.classList.add('open');
}

function closeAppSwitcher() {
  isAppSwitcherOpen = false;
  const switcher = document.getElementById('recentsSwitcherOverlay');
  if (switcher) switcher.classList.remove('open');
}

// Render Horizontal Snap Cards in Recents Switcher (Screenshot 2 Clone)
function renderRecentsCards() {
  const container = document.getElementById('recentsCardsTrack');
  if (!container) return;

  if (runningApps.length === 0) {
    container.innerHTML = `
      <div class="recents-empty-state">
        <i class="fa-solid fa-layer-group"></i>
        <h3>No Recent Apps</h3>
        <p style="font-size: 11.5px; opacity: 0.8; margin-top: 4px;">Tap any app on Home Screen to launch</p>
      </div>
    `;
    return;
  }

  // Generate cards for each running app in reverse order (most recent first)
  const reversedApps = [...runningApps].reverse();

  container.innerHTML = reversedApps.map(appId => {
    const app = APP_REGISTRY[appId];
    if (!app) return '';

    return `
      <div class="recent-card" onclick="openApp('${app.id}')">
        <!-- Card Top Bar -->
        <div class="recent-card-head">
          <div class="recent-card-brand">
            <i class="fa-solid ${app.icon}" style="color: ${app.color};"></i>
            <span class="recent-card-title">${app.name}</span>
          </div>
          <div class="recent-card-actions">
            <button class="recent-close-app-btn" onclick="event.stopPropagation(); closeAppFromSwitcher('${app.id}')" title="Close this app">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- Live Content Snapshot (Like Spotify Player in Screenshot 2) -->
        <div class="recent-card-preview">
          ${getAppPreviewHTML(app.id)}
        </div>
      </div>
    `;
  }).join('');
}

// Get realistic miniature snapshot for each running app
function getAppPreviewHTML(appId) {
  switch (appId) {
    case 'claims':
      return `
        <div class="preview-mini-metric" style="border-left: 3px solid #ef4444;">
          <span>Active Claims: <strong>14</strong></span>
          <span style="color: #16a34a; font-weight: 700;">98.4% Ratio</span>
        </div>
        <div style="background: #fff; border-radius: 10px; padding: 10px; border: 1px solid #e2e8f0;">
          <strong style="font-size: 11px; display: block; margin-bottom: 2px;">Manishbhai Desai</strong>
          <span style="font-size: 10px; color: #64748b;">Care Health • Zydus Hospital</span>
          <div style="font-size: 10px; margin-top: 4px; color: #16a34a; font-weight: 700;">Approved (₹1,50,000)</div>
        </div>
        <div style="background: #fff; border-radius: 10px; padding: 10px; border: 1px solid #e2e8f0;">
          <strong style="font-size: 11px; display: block; margin-bottom: 2px;">Suresh Patel</strong>
          <span style="font-size: 10px; color: #64748b;">ICICI Lombard • Motor Claim</span>
          <div style="font-size: 10px; margin-top: 4px; color: #d97706; font-weight: 700;">Surveyor Appointed</div>
        </div>
      `;

    case 'investment':
      return `
        <div style="background: linear-gradient(135deg, #0f766e, #14b8a6); color: #fff; border-radius: 10px; padding: 10px;">
          <span style="font-size: 9px; opacity: 0.9;">TOTAL AUM</span>
          <h4 style="font-size: 16px; margin: 2px 0 6px;">₹3.85 Crore</h4>
          <span style="font-size: 9px;">318 Active SIPs • +21.4% XIRR</span>
        </div>
        <div class="preview-mini-metric">
          <span>Parag Parikh Flexi</span>
          <strong style="color: #0d9488;">₹1.12 Cr</strong>
        </div>
        <div class="preview-mini-metric">
          <span>Nippon India Small Cap</span>
          <strong style="color: #0d9488;">₹92.8 L</strong>
        </div>
      `;

    case 'commission':
      return `
        <div style="background: linear-gradient(135deg, #047857, #10b981); color: #fff; border-radius: 10px; padding: 10px;">
          <span style="font-size: 9px; opacity: 0.9;">MONTH COMMISSION</span>
          <h4 style="font-size: 16px; margin: 2px 0 6px;">₹2,84,500</h4>
          <span style="font-size: 9px;">TDS Deducted: ₹14,225</span>
        </div>
        <div class="preview-mini-metric">
          <span>First Year (FYC):</span>
          <strong style="color: #16a34a;">₹1,76,200</strong>
        </div>
        <div class="preview-mini-metric">
          <span>Renewal (RC):</span>
          <strong style="color: #2563eb;">₹68,300</strong>
        </div>
      `;

    case 'clients':
      return `
        <div class="preview-mini-metric" style="border-left: 3px solid #2563eb;">
          <span>Clients: <strong>1,428</strong></span>
          <span style="color: #2563eb;">Active Directory</span>
        </div>
        <div style="background: #fff; border-radius: 10px; padding: 8px 10px; border: 1px solid #e2e8f0;">
          <strong style="font-size: 11px;">Rajeshbhai Patel</strong>
          <span style="font-size: 10px; color: #64748b; display: block;">Ahmedabad • 4 Policies</span>
        </div>
        <div style="background: #fff; border-radius: 10px; padding: 8px 10px; border: 1px solid #e2e8f0;">
          <strong style="font-size: 11px;">Dharmesh Shah</strong>
          <span style="font-size: 10px; color: #64748b; display: block;">Vadodara • HNI Client</span>
        </div>
      `;

    case 'life':
      return `
        <div class="preview-mini-metric" style="border-left: 3px solid #f43f5e;">
          <span>Life Policies: <strong>520</strong></span>
          <span>Coverage: ₹120 Cr</span>
        </div>
        <div style="background: #fff; border-radius: 10px; padding: 8px 10px; border: 1px solid #e2e8f0;">
          <strong style="font-size: 11px;">HDFC Click 2 Protect</strong>
          <span style="font-size: 10px; color: #dc2626; display: block; font-weight: 700;">Due in 2 days (₹28,450)</span>
        </div>
      `;

    default:
      return `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #64748b;">
          <i class="fa-solid fa-circle-check" style="font-size: 28px; color: #3b82f6; margin-bottom: 8px;"></i>
          <span style="font-size: 11px; font-weight: 700;">${appId.toUpperCase()} Active</span>
          <span style="font-size: 9.5px;">Ready in background</span>
        </div>
      `;
  }
}

// Close a Single App from Switcher
function closeAppFromSwitcher(appId) {
  runningApps = runningApps.filter(id => id !== appId);
  
  // If active app was closed, pick another or go home
  if (activeAppId === appId) {
    if (runningApps.length > 0) {
      activeAppId = runningApps[runningApps.length - 1];
    } else {
      activeAppId = null;
      document.querySelectorAll('.app-window').forEach(win => win.classList.remove('active'));
    }
  }

  // Deactivate closed app window
  const closedWin = document.getElementById(`appWindow-${appId}`);
  if (closedWin) closedWin.classList.remove('active');

  renderRecentsCards();
  showToast(`Closed ${APP_REGISTRY[appId]?.name || appId}`);
}

// "Close all" Apps (Screenshot 2 Feature!)
function closeAllApps() {
  runningApps = [];
  activeAppId = null;
  
  // Close all app windows
  document.querySelectorAll('.app-window').forEach(win => {
    win.classList.remove('active');
  });

  closeAppSwitcher();
  showToast('All background apps closed. Returned to Home.');
}

// System Home Button Action (Circle)
function goHome() {
  closeAppSwitcher();
  closeUniversalModalDirect();

  // Minimize active app window
  document.querySelectorAll('.app-window').forEach(win => {
    win.classList.remove('active');
  });

  showToast('Home Screen');
}

// System Back Button Action (Chevron)
function goBack() {
  const modal = document.getElementById('universalModalBackdrop');
  if (modal && modal.classList.contains('open')) {
    closeUniversalModalDirect();
    return;
  }

  if (isAppSwitcherOpen) {
    closeAppSwitcher();
    return;
  }

  // If inside an app window, go back to home
  goHome();
}

// ==========================================================================
// IN-APP CONTENTS & FUNCTIONALITY
// ==========================================================================

// Render Claims Feed
function renderClaimsFeed(claims) {
  const container = document.getElementById('claimsFeedList');
  if (!container) return;

  container.innerHTML = claims.map(c => `
    <div class="claim-card-row">
      <div class="claim-head-row">
        <span style="font-size: 11px; font-weight: 800; color: #2563eb;">${c.id}</span>
        <span class="claim-badge ${c.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${c.status}</span>
      </div>
      <div style="font-size: 13px; font-weight: 800; margin-bottom: 2px;">${c.client}</div>
      <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">${c.company} • ${c.hospital}</div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 6px; font-size: 11.5px;">
        <span>Claim: <strong style="color: #dc2626;">${c.amount}</strong></span>
        <span style="font-size: 10px; color: #94a3b8;">${c.date}</span>
      </div>
    </div>
  `).join('');
}

function filterClaimTab(type, el) {
  document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (el) el.classList.add('active');

  if (type === 'all') {
    renderClaimsFeed(claimsData);
  } else {
    renderClaimsFeed(claimsData.filter(c => c.type === type));
  }
}

// Render Portfolios in Investment App
function renderPortfolios() {
  const container = document.getElementById('portfolioListContainer');
  if (!container) return;

  container.innerHTML = portfolioData.map(fund => `
    <div style="background: #fff; border: 1px solid var(--border-light); border-radius: 12px; padding: 12px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
        <h5 style="font-size: 13px; font-weight: 800; color: #0f172a;">${fund.fundName}</h5>
        <span style="font-size: 11px; font-weight: 800; color: #16a34a;">${fund.xirr}</span>
      </div>
      <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">${fund.category} • ${fund.sipCount} Active SIPs</div>
      <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; font-size: 11px;">
        <span>Client AUM</span>
        <strong style="color: #0d9488;">${fund.aum}</strong>
      </div>
    </div>
  `).join('');
}

// Render Client CRM App
function renderClientsApp(clients) {
  const container = document.getElementById('appClientsFeed');
  if (!container) return;

  container.innerHTML = clients.map(client => `
    <div style="background: #fff; border: 1px solid var(--border-light); border-radius: 12px; padding: 12px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div>
          <h4 style="font-size: 13.5px; font-weight: 800; color: #0f172a;">${client.name}</h4>
          <span style="font-size: 11px; color: #64748b;">${client.city} • ${client.phone}</span>
        </div>
        <span style="font-size: 10px; background: #eff6ff; color: #1e40af; font-weight: 700; padding: 3px 8px; border-radius: 20px;">${client.type}</span>
      </div>
      <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; font-size: 11px; margin-bottom: 8px;">
        <span>Policies: <strong>${client.policies}</strong></span>
        <span>Premium: <strong style="color: #2563eb;">${client.annualPremium}</strong></span>
      </div>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button onclick="sendWhatsApp('${client.name}', '${client.phone}')" style="background: #25d366; color: #fff; border: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer;">
          <i class="fa-brands fa-whatsapp"></i> Chat
        </button>
        <button onclick="callPhone('${client.phone}')" style="background: #f1f5f9; color: #0f172a; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 600; cursor: pointer;">
          <i class="fa-solid fa-phone"></i> Call
        </button>
      </div>
    </div>
  `).join('');
}

function searchClientsApp(query) {
  const q = query.toLowerCase();
  const filtered = clientsData.filter(c => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.phone.includes(q));
  renderClientsApp(filtered);
}

// Render Life Policies Feed
function renderLifeFeed(category = 'all') {
  const container = document.getElementById('lifePoliciesFeed');
  if (!container) return;

  const filtered = category === 'all' ? lifePoliciesData : lifePoliciesData.filter(p => p.category === category);

  container.innerHTML = filtered.map(p => `
    <div class="policy-card-row">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: 10.5px; background: #fee2e2; color: #b91c1c; font-weight: 800; padding: 2px 7px; border-radius: 4px;">${p.company}</span>
        <span style="font-size: 11px; font-weight: 700; color: #dc2626;">${p.status}</span>
      </div>
      <h4 style="font-size: 13.5px; font-weight: 800; margin-bottom: 2px;">${p.plan}</h4>
      <span style="font-size: 11px; color: #64748b; display: block; margin-bottom: 6px;">Client: <strong>${p.client}</strong></span>
      <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; font-size: 11px;">
        <span>Sum Assured: <strong>${p.sumAssured}</strong></span>
        <span>Premium: <strong style="color: #2563eb;">${p.premium}</strong></span>
      </div>
    </div>
  `).join('');
}

function filterLifePlans(cat, el) {
  document.querySelectorAll('#appWindow-life .filter-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderLifeFeed(cat);
}

// Render General Policies Feed
function renderGeneralFeed(category = 'all') {
  const container = document.getElementById('generalPoliciesFeed');
  if (!container) return;

  const filtered = category === 'all' ? generalPoliciesData : generalPoliciesData.filter(p => p.category === category);

  container.innerHTML = filtered.map(p => `
    <div class="policy-card-row">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: 10.5px; background: #fef3c7; color: #b45309; font-weight: 800; padding: 2px 7px; border-radius: 4px;">${p.company}</span>
        <span style="font-size: 11px; font-weight: 700; color: #16a34a;">${p.status}</span>
      </div>
      <h4 style="font-size: 13.5px; font-weight: 800; margin-bottom: 2px;">${p.plan}</h4>
      <span style="font-size: 11px; color: #64748b; display: block; margin-bottom: 6px;">Client: <strong>${p.client}</strong></span>
      <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; font-size: 11px;">
        <span>Coverage: <strong>${p.sumAssured}</strong></span>
        <span>Premium: <strong style="color: #2563eb;">${p.premium}</strong></span>
      </div>
    </div>
  `).join('');
}

function filterGeneralPlans(cat, el) {
  document.querySelectorAll('#appWindow-general .filter-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderGeneralFeed(cat);
}

// Sub Agents
function renderSubAgents() {
  const container = document.getElementById('agentHierarchyContainer');
  if (!container) return;

  container.innerHTML = `
    <div style="background: #fff; border: 1px solid var(--border-light); border-radius: 12px; padding: 12px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <strong style="font-size: 13px;">Hitesh Solanki (POSP-084)</strong>
        <span style="color: #16a34a; font-weight: 700; font-size: 11px;">Active</span>
      </div>
      <p style="font-size: 11px; color: #64748b;">Policies this month: 14 • Commission: ₹38,200</p>
    </div>
    <div style="background: #fff; border: 1px solid var(--border-light); border-radius: 12px; padding: 12px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <strong style="font-size: 13px;">Nirav Trivedi (POSP-112)</strong>
        <span style="color: #16a34a; font-weight: 700; font-size: 11px;">Active</span>
      </div>
      <p style="font-size: 11px; color: #64748b;">Policies this month: 9 • Commission: ₹24,800</p>
    </div>
  `;
}

// Interactive Modals
function openNewClaimModal() {
  openModal("File New Claim", "Cashless Hospital or Motor Intimation", "fa-file-medical", `
    <form onsubmit="handleClaimSubmit(event)">
      <div style="margin-bottom: 10px;">
        <label style="font-size: 11px; font-weight: 700; display: block; margin-bottom: 4px;">Client Name *</label>
        <select id="claimClient" required style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
          ${clientsData.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
        </select>
      </div>
      <div style="margin-bottom: 10px;">
        <label style="font-size: 11px; font-weight: 700; display: block; margin-bottom: 4px;">Claim Type</label>
        <select id="claimType" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
          <option value="cashless">Health / Mediclaim (Hospital Cashless)</option>
          <option value="motor">Motor / Vehicle Accident</option>
          <option value="death">Death / Term Claim</option>
        </select>
      </div>
      <div style="margin-bottom: 14px;">
        <label style="font-size: 11px; font-weight: 700; display: block; margin-bottom: 4px;">Estimated Claim Amount (₹)</label>
        <input type="text" id="claimAmount" required placeholder="₹1,00,000" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
      </div>
      <button type="submit" style="width: 100%; background: #ef4444; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
        Submit Claim Intimation
      </button>
    </form>
  `);
}

function handleClaimSubmit(e) {
  e.preventDefault();
  const client = document.getElementById('claimClient').value;
  const type = document.getElementById('claimType').value;
  const amount = document.getElementById('claimAmount').value;

  const newClaim = {
    id: "CLM-" + Math.floor(1000 + Math.random() * 9000),
    client: client,
    company: "Care Health",
    type: type,
    hospital: "City Civil / Apollo",
    amount: amount,
    status: "In Process",
    date: "Just now"
  };

  claimsData.unshift(newClaim);
  renderClaimsFeed(claimsData);

  const badge = document.getElementById('activeClaimCount');
  if (badge) badge.textContent = claimsData.length;

  closeUniversalModalDirect();
  showToast(`Claim ${newClaim.id} initiated for ${client}!`);
}

function openStartSIPModal() {
  openModal("Start New SIP / Mutual Fund", "Calculate wealth returns & setup mandate", "fa-chart-line", `
    <div style="margin-bottom: 10px;">
      <label style="font-size: 11px; font-weight: 700; display: block;">Select Mutual Fund</label>
      <select style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 4px;">
        <option>Parag Parikh Flexi Cap Fund</option>
        <option>Nippon India Small Cap Fund</option>
        <option>SBI Bluechip Fund</option>
      </select>
    </div>
    <div style="margin-bottom: 14px;">
      <label style="font-size: 11px; font-weight: 700; display: block;">Monthly SIP Amount (₹)</label>
      <input type="text" value="₹10,000" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 4px;">
    </div>
    <button onclick="showToast('SIP Mandate link generated and sent to client!'); closeUniversalModalDirect();" style="width: 100%; background: #0d9488; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
      Generate e-Mandate Link
    </button>
  `);
}

function openAddClientDialog() {
  openModal("Add Client Profile", "Register new client & family", "fa-user-plus", `
    <form onsubmit="handleClientCreate(event)">
      <div style="margin-bottom: 10px;">
        <label style="font-size: 11px; font-weight: 700; display: block;">Client Full Name *</label>
        <input type="text" id="newCName" required placeholder="e.g. Mukeshbhai Ambani" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
      </div>
      <div style="margin-bottom: 10px;">
        <label style="font-size: 11px; font-weight: 700; display: block;">Mobile Number *</label>
        <input type="tel" id="newCPhone" required placeholder="+91 98..." style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
      </div>
      <div style="margin-bottom: 14px;">
        <label style="font-size: 11px; font-weight: 700; display: block;">City</label>
        <input type="text" id="newCCity" placeholder="Ahmedabad" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
      </div>
      <button type="submit" style="width: 100%; background: #2563eb; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
        Save Client & Create Portfolio
      </button>
    </form>
  `);
}

function handleClientCreate(e) {
  e.preventDefault();
  const name = document.getElementById('newCName').value;
  const phone = document.getElementById('newCPhone').value;
  const city = document.getElementById('newCCity').value || 'Gujarat';

  clientsData.unshift({
    id: "CL-" + Math.floor(100 + Math.random() * 900),
    name: name,
    city: city,
    phone: phone,
    type: "Retail",
    policies: 1,
    totalSumAssured: "₹25.00 Lakh",
    annualPremium: "₹18,000"
  });

  renderClientsApp(clientsData);
  closeUniversalModalDirect();
  showToast(`Client "${name}" added!`);
}

function openAddPolicyModal(type) {
  openModal(`New ${type.toUpperCase()} Policy Entry`, "Book coverage and generate schedule", "fa-plus", `
    <div style="margin-bottom: 10px;">
      <label style="font-size: 11px; font-weight: 700; display: block;">Policy Name</label>
      <input type="text" placeholder="e.g. Max Life Super Term / Star Health" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
    </div>
    <div style="margin-bottom: 14px;">
      <label style="font-size: 11px; font-weight: 700; display: block;">Annual Premium (₹)</label>
      <input type="text" placeholder="₹25,000" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
    </div>
    <button onclick="showToast('Policy registered successfully!'); closeUniversalModalDirect();" style="width: 100%; background: #16a34a; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
      Save & Book Policy
    </button>
  `);
}

// Modal helper
function openModal(title, sub, icon, bodyHtml) {
  const backdrop = document.getElementById('universalModalBackdrop');
  const titleEl = document.getElementById('modalTitle');
  const subEl = document.getElementById('modalSubtitle');
  const iconBubble = document.getElementById('modalIconBubble');
  const bodyEl = document.getElementById('modalBody');

  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = sub;
  if (iconBubble) iconBubble.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  if (bodyEl) bodyEl.innerHTML = bodyHtml;

  backdrop?.classList.add('open');
}

function closeUniversalModal(e) {
  if (e.target.id === 'universalModalBackdrop') {
    closeUniversalModalDirect();
  }
}

function closeUniversalModalDirect() {
  document.getElementById('universalModalBackdrop')?.classList.remove('open');
}

// User Actions
function sendWhatsApp(clientName, phone) {
  const msg = `Namaste ${clientName} ji, from Bhavesh Patel (Financial Advisor). How can I assist you with your insurance or investment today?`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  showToast(`WhatsApp opened for ${clientName}`);
}

function callPhone(phone) {
  window.location.href = `tel:${phone}`;
  showToast(`Calling ${phone}...`);
}

function downloadPayoutSlip() {
  showToast("Downloading November Commission & TDS Payout Slip (PDF)...");
}

function downloadMISReport() {
  showToast("Downloading Executive Monthly MIS Report (PDF)...");
}

function generateReport(rep) {
  showToast(`Generating ${rep.toUpperCase()} report...`);
}

function sendBroadcast(type) {
  if (type === 'renewals') {
    showToast("Sent automated renewal payment links to 5 clients!");
  } else if (type === 'festive') {
    showToast("Branded festival greeting sent with your photo & license!");
  } else {
    showToast("Section 80C tax saving blast sent to all 1,428 clients!");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  showToast('Theme switched');
}

function focusAppSearch() {
  openApp('clients');
  setTimeout(() => {
    document.getElementById('appClientSearch')?.focus();
  }, 300);
}

// Toast Popup
function showToast(message) {
  const toast = document.getElementById('toastMessage');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// ==========================================================================
// PWA (PROGRESSIVE WEB APP) SERVICE WORKER & DIRECT CHROME INSTALL ENGINE
// ==========================================================================

// Register Service Worker for PWA Offline & Installability Criteria
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('[PWA] ServiceWorker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.log('[PWA] ServiceWorker registration failed:', err);
      });
  });
}

// Global PWA Install Prompt Holder
let deferredPwaPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent default mini-infobar on mobile Chrome
  e.preventDefault();
  deferredPwaPrompt = e;
  console.log('[PWA] beforeinstallprompt event captured');

  // Highlight and show the install banner
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) {
    banner.style.display = 'flex';
  }
});

window.addEventListener('appinstalled', () => {
  deferredPwaPrompt = null;
  showToast('🎉 Smart Insurance OS Installed to Home Screen!');
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
});

// Trigger Direct Install or Show Quick Step-by-Step Guide
function triggerPwaInstall() {
  if (deferredPwaPrompt) {
    // Show Chrome's native install dialog
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('Installing application to your device...');
      } else {
        showToast('Install cancelled.');
      }
      deferredPwaPrompt = null;
    });
  } else {
    // Show interactive instructions modal for Chrome Mobile
    openModal(
      "Install App to Mobile Chrome",
      "Add to your Android or iPhone Home Screen",
      "fa-mobile-screen",
      `
      <div style="background: linear-gradient(135deg, #0b1120, #1e293b); color: #fff; border-radius: 14px; padding: 14px; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <i class="fa-brands fa-chrome text-primary" style="font-size: 22px; color: #38bdf8;"></i>
          <strong style="font-size: 13.5px;">Google Chrome (Android) માં ઇન્સ્ટોલ કરો:</strong>
        </div>
        <ol style="font-size: 11.5px; line-height: 1.6; padding-left: 20px; color: #e2e8f0;">
          <li>તમારા મોબાઇલ Chrome બ્રાઉઝરમાં ઉપર જમણી બાજુના <strong>3 ડૉટ્સ (⋮)</strong> મેનુ પર ક્લિક કરો.</li>
          <li>મેનુમાં <strong>"Install app"</strong> અથવા <strong>"Add to Home screen" (હોમ સ્ક્રીન પર ઉમેરો)</strong> પર ટેપ કરો.</li>
          <li>પછી <strong>"Install"</strong> પર ક્લિક કરો.</li>
        </ol>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <i class="fa-brands fa-apple" style="font-size: 20px; color: #0f172a;"></i>
          <strong style="font-size: 13px; color: #0f172a;">iPhone (Safari) માટે:</strong>
        </div>
        <p style="font-size: 11.5px; color: #64748b; line-height: 1.5;">
          Safari માં નીચે આપેલા <strong>Share <i class="fa-solid fa-arrow-up-from-bracket"></i></strong> બટન પર ટેપ કરો અને <strong>"Add to Home Screen"</strong> સિલેક્ટ કરો.
        </p>
      </div>

      <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 10px 12px; font-size: 11px; color: #065f46; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 16px;"></i>
        <span>ઇન્સ્ટોલ કર્યા પછી આ એપ તમારા ફોનના બધા ઓરિજિનલ એપ્લિકેશન્સની જેમ જ ફૂલ સ્ક્રીનમાં ઓપન થશે!</span>
      </div>
      `
    );
  }
}

