"use client";

export default function MapSection() {
  return (
    <div className="h-96 w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8438.018151195703!2d98.54068074902503!3d3.5380159158300817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312796337ffdad%3A0x68263097890b9733!2sPONDOK%20PESANTREN%20SAWIT%20REJO%20(LDII)!5e0!3m2!1sid!2sid!4v1746666299936!5m2!1sid!2sid"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
