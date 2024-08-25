document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('consentModal');
    const customModal = document.getElementById('customSettingsModal');
    const acceptAllButton = document.getElementById('acceptAll');
    const rejectAllButton = document.getElementById('rejectAll');
    const customSettingsButton = document.getElementById('customSettings');
    const saveCustomSettingsButton = document.getElementById('saveCustomSettings');
    const backToMainButton = document.getElementById('backToMain');
    const customConsentForm = document.getElementById('customConsentForm');

    if (!localStorage.getItem('consentGiven')) {
        modal.style.display = 'flex';
    }

    acceptAllButton.addEventListener('click', function() {
        localStorage.setItem('consentGiven', 'true');
        modal.style.display = 'none';
        handleConsent({
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_personalization: 'granted',
            ad_user_data: 'granted'
        });
    });

    rejectAllButton.addEventListener('click', function() {
        localStorage.setItem('consentGiven', 'false');
        modal.style.display = 'none';
        handleConsent({
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_personalization: 'denied',
            ad_user_data: 'denied'
        });
    });

    customSettingsButton.addEventListener('click', function() {
        modal.style.display = 'none';
        customModal.style.display = 'flex';
    });

    saveCustomSettingsButton.addEventListener('click', function() {
        const formData = new FormData(customConsentForm);
        const consentSettings = {
            ad_storage: formData.get('ad_storage') ? 'granted' : 'denied',
            analytics_storage: formData.get('analytics_storage') ? 'granted' : 'denied',
            ad_personalization: formData.get('ad_personalization') ? 'granted' : 'denied',
            ad_user_data: formData.get('ad_user_data') ? 'granted' : 'denied'
        };
        localStorage.setItem('consentGiven', 'true');
        customModal.style.display = 'none';
        handleConsent(consentSettings);
    });

    backToMainButton.addEventListener('click', function() {
        customModal.style.display = 'none';
        modal.style.display = 'flex';
    });

    function handleConsent(consent) {
        window.gtag('consent', 'update', consent);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'GTM-MMGK6SLH');
});
