import Logo from '@/assets/Logo';

export default function Contact() {
  return (
    <div className="h-screen flex flex-col justify-center items-center justify-center gap-6">
      <Logo fillColor="black" />
      <p className="text-lg">We&apos;d like to hear from you!</p>
      <div className="w-1/2 max-w-[1440px] border border-1 bg-zinc-200 p-6 rounded-md p-4">
        <form
          className="flex flex-col gap-4"
          action="https://formsubmit.co/prokser27@icloud.com"
          method="POST"
        >
          <input
            type="hidden"
            name="_next"
            value="http://localhost:5173/contact"
          />
          <input
            type="hidden"
            name="_subject"
            value="New Contact Form Message!"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" style={{ display: 'none' }} />
          <input
            autoFocus
            required
            type="email"
            name="email"
            placeholder="Your email"
            className="border-gray-300 border rounded-md py-2 px-2"
          />
          <textarea
            required
            placeholder="Your message"
            name="message"
            className="min-h-44 w-full border-gray-300 border rounded-md py-2 px-2 resize-none"
          />
          <button className="border border-1 rounded-lg p-2 text-white bg-accent-purple-500 hover:bg-accent-purple-300">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}
