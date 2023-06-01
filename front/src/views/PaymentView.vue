<template>

    <button type="submit" @click="handlePayment">Payer</button>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

export default {
    methods: {
        async handlePayment() {
            // Chargez le module Stripe côté client
            const stripe = await loadStripe('pk_test_51N5c57DvWceembxrRlG9ozF65J3tO3NYSXf6QUHbdhTjAXYHI8ruTL9ksKvNj2YrKvv0DLcpyEX6vJGuScqziBR800H54M7T14');

            // Créez une session de paiement en appelant votre route de paiement côté serveur
            const response = await fetch('http://localhost:3000/payments/', {
                method: 'POST',
                // Inclure les données de paiement nécessaires dans le corps de la requête (par exemple, montant, devise, etc.)
                body: JSON.stringify({ /* Données de paiement */ }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            const redirectUrl = data.redirectUrl;

            window.location.href = redirectUrl;

            // // Récupérez les informations de la session de paiement depuis la réponse du serveur
            // const session = await response.json();
            //
            // // Redirigez l'utilisateur vers la page de paiement Stripe pour finaliser la transaction
            // const { error } = await stripe.redirectToCheckout({
            //     sessionId: session.id
            // });
            //
            // if (error) {
            //     // Gérez l'erreur côté client
            // }
        }
    }
}
</script>
