document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. OBSŁUGA KOSZYKA ---
    let liczbaWKoszyku = 0;
    const btnKup = document.getElementById('btn-kup');
    const licznikElement = document.getElementById('licznik-koszyka');

    btnKup.addEventListener('click', function() {
        liczbaWKoszyku++; // Zwiększamy liczbę
        licznikElement.innerText = liczbaWKoszyku; // Wyświetlamy
        
        // Mała animacja przycisku
        btnKup.innerText = "Dodano! (" + liczbaWKoszyku + ")";
        setTimeout(() => {
            btnKup.innerText = "Kup Teraz";
        }, 1000);
    });

    // --- 2. POWIĘKSZANIE ZDJĘĆ (MODAL) ---
    const zdjecia = document.querySelectorAll('.gallery-img');
    const modalElement = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImg = document.getElementById('modalImage');

    zdjecia.forEach(fotka => {
        fotka.addEventListener('click', function() {
            // Pobieramy źródło klikniętego zdjęcia
            const zrodlo = this.src;
            // Wstawiamy do modala
            modalImg.src = zrodlo;
            // Pokazujemy modal
            modalElement.show();
        });
    });

    // --- 3. AJAX (SZCZEGÓŁY) ---
    const btnAjax = document.getElementById('pobierzDetale');
    const displayAjax = document.getElementById('opis-ajax');
    const errorMsg = document.getElementById('ajax-error');

    btnAjax.addEventListener('click', function() {
        fetch('dane.json')
            .then(response => {
                if (!response.ok) throw new Error("Błąd sieci");
                return response.json();
            })
            .then(data => {
                displayAjax.innerHTML = `
                    <hr>
                    <h5>Specyfikacja:</h5>
                    <ul>
                        <li><strong>Materiał:</strong> ${data.tkanina}</li>
                        <li><strong>Rozmiary:</strong> ${data.rozmiary}</li>
                        <li><strong>Nadruk:</strong> ${data.nadruk}</li>
                    </ul>
                    <p><em>${data.info}</em></p>
                `;
                displayAjax.classList.remove('d-none');
                btnAjax.style.display = 'none';
            })
            .catch(err => {
                console.log('Błąd:', err);
                // Jeśli działa lokalnie (z dysku), pokaż komunikat błędu dla użytkownika
                errorMsg.classList.remove('d-none');
            });
    });
});