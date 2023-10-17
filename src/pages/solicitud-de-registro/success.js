import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components/containers/Layout/Layout";

export default function Success() {
  const router = useRouter();
  const { payment_id } = router.query;

  const [paymentData, setPaymentData] = useState({
    id: "",
    status: "",
    status_detail: "",
    payment_type: "",
    merchant_order_id: "",
    preference_id: "",
    site_id: "",
    processing_mode: "",
  });
  const [error, setError] = useState(false);

  const getPayment = async () => {
    try {
      console.log(payment_id);
      if (payment_id) {
        console.log(payment_id);
        // consultar el estado de la solicitud en la base de datos
        // `https://firulaix-api-test.vercel.app/api/payment/order?id=${payment_id}`,
        // `http://localhost:5000/api/payment/order?id=${payment_id}`,
        const resp = await fetch(
          `https://firulaix-api-nodejs.vercel.app/api/payment/order?id=${payment_id}`,
          {
            method: "POST",
          }
        );
        const data = await resp.json();
        console.log(data);
        // console.log(data.error.status);
        if (data.ok) {
          console.log(error);
          setPaymentData(data);
        }
        if (!data.ok) {
          setError(true);
          router.push("/solicitud-de-registro/failure");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (payment_id) {
      getPayment();
    }
  }, [payment_id]);
  return (
    <Layout title={"Solicitud de registro"}>
      <div className="flex flex-col pt-20" style={{ fontFamily: "serif" }}>
        {!error ? (
          <div className="flex w-full justify-center bg-green-500">
            <div className="flex flex-col font-fredoka py-10">
              <h1 className="text-3xl font-bold">Gracias por tu solicitud</h1>
              <p className="text-xl font-semibold">
                En breve nos pondremos en contacto contigo
              </p>
              <p className="text-xl font-semibold">
                Revisa tu correo electrónico para más información
              </p>
              {paymentData.status === "approved" && paymentData.id && (
                <div className="">
                  <h2 className="font-bold">Información de pago</h2>
                  <p>Id de pago: {paymentData.id}</p>
                  <p>Estado: {paymentData.status}</p>
                  <p>Detalle: {paymentData.status_detail}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center bg-red-500">
            <div className="flex flex-col font-fredoka py-10">
              <h1 className="text-3xl font-bold">
                Ha ocurrido un error con tu solicitud
              </h1>
              <p className="text-xl font-semibold">
                Por favor, intenta nuevamente
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
