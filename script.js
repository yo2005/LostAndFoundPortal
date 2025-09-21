// Initial data store to simulate a database with more items
let items = [
    {
        id: 'item-1',
        type: 'Found',
        description: 'Black leather wallet.',
        location: 'Library, 3rd floor',
        branch: 'IT',
        date: '2025-09-18',
        status: 'Pending',
        image:'https://www.thepostbox.in/cdn/shop/files/09_6d802604-f18f-465e-abd6-6120b67bad35.jpg?v=1750941584',
        claims:[]
    },
    {
        id: 'item-2',
        type: 'Lost',
        description: 'A set of car keys with a red keychain.',
        location: 'Campus parking lot',
        branch: 'CST',
        date: '2025-09-17',
        status: 'Resolved',
        image: '',
        claims: []
    },
    {
        id: 'item-3',
        type: 'Found',
        description: 'Silver Lenovo.',
        location: 'Foyer',
        branch: 'ENC',
        date: '2025-09-19',
        status: 'Pending',
        image: 'https://thumbs.dreamstime.com/z/abstract-blurred-photo-laptop-office-abstract-blurred-photo-laptop-office-working-concept-125892535.jpg',
        claims: []
    },
    {
        id: 'item-4',
        type: 'Lost',
        description: 'Silver Lenovo.',
        location: 'Foyer',
        branch: 'CE',
        date: '2025-09-18',
        status: 'Pending',
        image: '',
        claims: []
    },
    {
        id: 'item-5',
        type: 'Found',
        description: 'Leather Belt Watch',
        location: 'Gymnasium locker room',
        branch: 'IT',
        date: '2025-09-16',
        status: 'Pending',
        image: 'https://c8.alamy.com/comp/BMN438/blurred-wrist-watch-BMN438.jpg',
        claims: []
    },
    {
        id: 'item-6',
        type: 'Lost',
        description: 'Reading glasses with a silver frame.',
        location: 'Physics Lab',
        branch: 'ENC',
        date: '2025-09-15',
        status: 'Pending',
        image: '',
        claims: []
    },
    {
        id: 'item-7',
        type: 'Lost',
        description: 'Silver ring with a small sapphire stone.',
        location: 'Canteen',
        branch: 'DS',
        date: '2025-09-12',
        status: 'Pending',
        image: '',
        claims: []
    },
    {
        id: 'item-8',
        type: 'Found',
        description: 'A blue umbrella with a wooden handle.',
        location: 'Main Gate',
        branch: 'CE',
        date: '2025-09-20',
        status: 'Pending',
        image: 'https://baliosumbrellas.com/wp-content/uploads/2023/09/01-11-600x600.jpg',
        claims: []
    },
    {
        id: 'item-9',
        type: 'Found',
        description: 'A black leather-bound notebook.',
        location: 'Chemistry Lab',
        branch: 'IT',
        date: '2025-09-21',
        status: 'Pending',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz_1fiMGCHQ8NNxNDwLIyS3AcVdBQuS1KQZA&s',
        claims: []
    }
];

const CREDENTIALS = {
    'cr': 'crpass',
    'admin': 'adminpass'
};

// UI Elements
const appContainer = document.getElementById('app-container');
const roleDropdown = document.querySelector('.dropdown-content');
const currentRoleLabel = document.getElementById('current-role-label');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const addItemModal = document.getElementById('addItemModal');
const claimModal = document.getElementById('claimModal');
const addItemForm = document.getElementById('addItemForm');
const claimForm = document.getElementById('claimForm');
const modalCloseButtons = document.querySelectorAll('.close-button');
const imageInput = document.getElementById('itemImage');
const imageLabelNote = document.getElementById('image-label-note');
const imageErrorMessage = document.getElementById('image-error-message');
const contactInput = document.getElementById('claimerContact');
const contactErrorMessage = document.getElementById('contact-error-message');
let currentRole = 'public';
let pendingRole = '';

// Helper function to render an individual item card
function createItemCard(item) {
    let actionsHtml = '';
    const itemHasImage = item.type === 'Found' && item.image;

    if (currentRole === 'public' && item.type === 'Found' && item.status === 'Pending') {
        actionsHtml = `<button class="claim-button" data-item-id="${item.id}">Claim</button>`;
    } else if (currentRole === 'admin') {
        if (item.status === 'Pending') {
            if (item.type === 'Found' && item.claims.length > 0) {
                actionsHtml = `<button class="admin-button approve" data-item-id="${item.id}">Review Claims (${item.claims.length})</button>`;
            } else if (item.type === 'Found' && item.claims.length === 0) {
                actionsHtml = `<p>No claims submitted.</p>`;
            }
            actionsHtml += `<button class="admin-button resolve" data-item-id="${item.id}">Mark Resolved</button>`;
        } else if (item.status === 'Resolved') {
            actionsHtml = `<button class="admin-button pending" data-item-id="${item.id}">Mark Pending</button>`;
        }
    }

    return `
        <div class="item-card">
            <div class="item-header">
                <span class="item-type ${item.type.toLowerCase()}">${item.type}</span>
                <span class="item-status">Status: ${item.status}</span>
            </div>
            ${itemHasImage ? `<div class="item-image-container"><img src="${item.image}" alt="Item image" class="item-image"></div>` : ''}
            <div class="item-body">
                <h3>${item.description}</h3>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Branch:</strong> ${item.branch}</p>
            </div>
            <div class="item-footer">
                ${actionsHtml}
            </div>
        </div>
    `;
}

// Helper function to render admin claim view
function createAdminCard(item) {
    let claimsHtml = '';
    if (item.type === 'Found') {
        claimsHtml = item.claims.length > 0 ?
            `<h4>Claims:</h4>` + item.claims.map(claim => `
                <div class="claim-proof">
                    <p><strong>Claimer:</strong> ${claim.name}</p>
                    <p><strong>Contact:</strong> ${claim.contact}</p>
                    <p><strong>Branch:</strong> ${claim.branch}</p>
                    <p><strong>Proof Desc:</strong> ${claim.proofDescription}</p>
                    ${claim.proofImage ? `<div class="claim-proof-image-container"><img src="${claim.proofImage}" alt="Proof image" class="item-image"></div>` : ''}
                    <div class="admin-actions">
                        <button class="admin-button approve-claim" data-item-id="${item.id}" data-claim-id="${claim.id}">Approve Claim</button>
                        <button class="admin-button reject-claim" data-item-id="${item.id}" data-claim-id="${claim.id}">Reject Claim</button>
                    </div>
                </div>
            `).join('') :
            `<p>No claims submitted yet.</p>`;
    } else {
        claimsHtml = `<p>This is a Lost item. No claims can be submitted.</p>`;
    }

    const adminActionsHtml = item.status === 'Pending' ?
        `<button class="admin-button resolve" data-item-id="${item.id}">Mark Resolved</button>` :
        `<button class="admin-button pending" data-item-id="${item.id}">Mark Pending</button>`;

    return `
        <div class="item-card">
            <div class="admin-card-header">
                <span class="item-type ${item.type.toLowerCase()}">${item.type}</span>
                <span class="item-status">Status: ${item.status}</span>
            </div>
            <h3>${item.description}</h3>
            ${item.image ? `<div class="item-image-container"><img src="${item.image}" alt="Item image" class="item-image"></div>` : ''}
            <div class="item-body">
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Branch:</strong> ${item.branch}</p>
            </div>
            <div class="claim-info">
                ${claimsHtml}
            </div>
            <div class="item-footer">
                ${adminActionsHtml}
            </div>
        </div>
    `;
}

// Main rendering function based on the current role
function renderContent() {
    appContainer.innerHTML = '';
    currentRoleLabel.textContent = currentRole.toUpperCase();
    let itemsHtml = '';

    if (currentRole === 'public' || currentRole === 'cr') {
        const addItemButtonHtml = (currentRole === 'cr') ? `<div id="cr-actions"><button id="addItemBtn">➕ Add Item</button></div>` : '';
        itemsHtml = items.map(item => createItemCard(item)).join('');
        appContainer.innerHTML = `${addItemButtonHtml}<div id="items-list">${itemsHtml}</div>`;
        if (currentRole === 'cr') {
            document.getElementById('addItemBtn').addEventListener('click', () => {
                addItemForm.reset();
                addItemModal.style.display = 'flex';
                document.getElementById('modal-title').textContent = 'Add Item';
            });
        }
    } else if (currentRole === 'admin') {
        itemsHtml = items.map(item => createAdminCard(item)).join('');
        appContainer.innerHTML = `<div id="items-list">${itemsHtml}</div>`;
    }

    addEventListeners();
}

// Add event listeners for dynamic content
function addEventListeners() {
    document.querySelectorAll('.claim-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            const itemToClaim = items.find(item => item.id === itemId);
            if (itemToClaim) {
                document.getElementById('claiming-item-title').textContent = itemToClaim.description;
                document.getElementById('claimItemId').value = itemId;
                claimModal.style.display = 'flex';
            }
        });
    });

    // Admin buttons
    document.querySelectorAll('.admin-button.approve').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            const item = items.find(i => i.id === itemId);
            if (item) {
                item.status = 'Reviewing Claims';
                renderContent();
            }
        });
    });

    document.querySelectorAll('.admin-button.approve-claim').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            const item = items.find(i => i.id === itemId);
            if (item) {
                const claimId = e.target.dataset.claimId;
                const claim = item.claims.find(c => c.id === claimId);
                if (confirm(`Are you sure you want to approve the claim from ${claim.name}? This will mark the item as resolved.`)) {
                    item.status = 'Resolved';
                    item.resolvedBy = claim.name;
                    item.claims = [claim];
                    renderContent();
                }
            }
        });
    });

    document.querySelectorAll('.admin-button.reject-claim').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            const item = items.find(i => i.id === itemId);
            if (item) {
                const claimId = e.target.dataset.claimId;
                if (confirm(`Are you sure you want to reject this claim?`)) {
                    item.claims = item.claims.filter(c => c.id !== claimId);
                    renderContent();
                }
            }
        });
    });

    // New Admin buttons for status
    document.querySelectorAll('.admin-button.resolve').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            const item = items.find(i => i.id === itemId);
            if (item && confirm('Are you sure you want to mark this item as resolved?')) {
                item.status = 'Resolved';
                item.resolvedBy = 'Admin';
                renderContent();
            }
        });
    });

    document.querySelectorAll('.admin-button.pending').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.dataset.itemId;
            const item = items.find(i => i.id === itemId);
            if (item && confirm('Are you sure you want to change this item back to pending?')) {
                item.status = 'Pending';
                item.resolvedBy = null;
                renderContent();
            }
        });
    });
}

// Modal closing logic
modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        addItemModal.style.display = 'none';
        claimModal.style.display = 'none';
        contactErrorMessage.textContent = ''; // Clear phone number error message
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === addItemModal) {
        addItemModal.style.display = 'none';
    }
    if (e.target === claimModal) {
        claimModal.style.display = 'none';
        contactErrorMessage.textContent = ''; // Clear phone number error message
    }
});

// Role switching and login logic
roleDropdown.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A') {
        const role = e.target.dataset.role;
        if (role === 'public') {
            currentRole = 'public';
            renderContent();
        } else {
            pendingRole = role;
            document.getElementById('login-title').textContent = `${role.toUpperCase()} Login`;
            loginForm.reset();
            loginError.textContent = '';
            loginModal.style.display = 'flex';
        }
    }
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (CREDENTIALS[pendingRole] === password) {
        currentRole = pendingRole;
        loginModal.style.display = 'none';
        renderContent();
    } else {
        loginError.textContent = 'Invalid credentials. Please try again.';
    }
});

// Add Item Form Submission
addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('itemType').value;
    const description = document.getElementById('itemDescription').value;
    const location = document.getElementById('itemLocation').value;
    const branch = document.getElementById('itemBranch').value;
    const image = document.getElementById('itemImage').value;

    if (type === 'Found' && !image) {
        imageErrorMessage.textContent = 'Image URL is required for Found items.';
        return;
    } else {
        imageErrorMessage.textContent = '';
    }

    const newItem = {
        id: 'item-' + (items.length + 1),
        type,
        description,
        location,
        branch,
        date: new Date().toISOString().slice(0, 10),
        status: 'Pending',
        image: image || '',
        claims: []
    };
    items.push(newItem);
    addItemModal.style.display = 'none';
    renderContent();
});

// Claim Form Submission
claimForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contactInput.value)) {
        contactErrorMessage.textContent = 'Please enter a valid 10-digit phone number.';
        return;
    } else {
        contactErrorMessage.textContent = '';
    }

    const itemId = document.getElementById('claimItemId').value;
    const claimerName = document.getElementById('claimerName').value;
    const claimerContact = document.getElementById('claimerContact').value;
    const claimerBranch = document.getElementById('claimerBranch').value;
    const claimProofDesc = document.getElementById('claimProofDesc').value;
    const claimProofImage = document.getElementById('claimProofImage').value;

    const item = items.find(i => i.id === itemId);
    if (item) {
        const newClaim = {
            id: 'claim-' + (item.claims.length + 1),
            name: claimerName,
            contact: claimerContact,
            branch: claimerBranch,
            proofDescription: claimProofDesc,
            proofImage: claimProofImage
        };
        item.claims.push(newClaim);
    }
    claimModal.style.display = 'none';
    renderContent();
});

// Toggle image requirement based on item type
document.getElementById('itemType').addEventListener('change', (e) => {
    if (e.target.value === 'Found') {
        imageLabelNote.style.display = 'inline';
        imageInput.setAttribute('required', 'required');
    } else {
        imageLabelNote.style.display = 'none';
        imageInput.removeAttribute('required');
    }
});

// Initial rendering
renderContent();