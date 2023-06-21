import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { memo } from 'react';

const FORM_ID = 'payment-form';

export const ModalForm = ({ info, url }) => {

    const handlePaymentMethod = useCallback(
        async () => {
            const formData = new FormData();
            formData.append("platform", "renian");
            formData.append("country", info.country);
            formData.append("person", info.person);
            formData.append("email", info.email);
            formData.append("phone", info.phone);
            formData.append("type", info.type);
            formData.append("document", info.document);
            formData.append("documentNumber", info.documentNumber);
            formData.append("typeService", info.typeService);
            formData.append("image", info.image);
            // const resp= await fetch('https://firulaix-api-nodejs.vercel.app/api/request/payment-methods');
            try {
                const resp = await fetch(`${ url }`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        platform: "renian",
                        country: info.country,
                        person: info.person,
                        email: info.email,
                        phone: info.phone,
                        type: info.type,
                        document: info.document,
                        documentNumber: info.documentNumber,
                        typeService: info.typeService,
                        image: ""
                    })
                });
                const data = await resp.json();
                // console.log(data)
                // console.log(data.data.id)
                // setPreferenceId(data.data.id)
                if (data.data.id) {
                    // console.log(data.data.id)
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src =
                        'https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js';
                    script.setAttribute('data-preference-id', data.data.id);
                    const form = document.getElementById(FORM_ID);
                    form.appendChild(script);
                }
                // window.open(data.data.init_point, "_blank");
            } catch (error) {
                console.log(error)
            }
        },
        [],
    )

    useEffect(() => {
        handlePaymentMethod()
    }, [url]);

    // useEffect(() => {
    //     if (preferenceId) {
    //         console.log(preferenceId)
    //         // con el preferenceId en mano, inyectamos el script de mercadoPago
    //         const script = document.createElement('script');
    //         script.type = 'text/javascript';
    //         script.src =
    //             'https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js';
    //         script.setAttribute('data-preference-id', preferenceId);
    //         const form = document.getElementById(FORM_ID);
    //         form.appendChild(script);
    //     }
    // }, [preferenceId]);

    return (
        <form id={FORM_ID} method="GET" />
    );
};

// ModalForm.displayName = 'ModalForm';

// export default ModalForm;
