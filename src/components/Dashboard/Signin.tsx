import mail from '/mail.svg';
import logo from '/logo.svg';
import lock from '/lock.svg';

export default function Signin() {
  return (
    <div className="w-full min-h-screen max-w-[1440px] my-0 mx-auto flex flex-col justify-center items-center">
      <div className="h-[64px]" />
      <div className="flex flex-col items-center w-1/2 h-1/2 gap-6">
        <img src={logo} alt="company logo" />
        <div className="w-1/2 bg-zinc-200 p-6 flex justify-center items-center rounded-md">
          <form className="flex flex-col gap-6 w-full">
            <div className="relative">
              <img
                src={mail}
                className="absolute left-3 top-3 h-5 w-5"
                alt="mail icon"
              />
              <input
                placeholder="Email"
                type="email"
                className="w-full border-gray-300 border rounded-md py-2 px-10"
              />
            </div>
            <div className="relative self-stretch">
              <img
                src={lock}
                className="absolute left-3 top-3 h-5 w-5"
                alt="mail icon"
              />
              <input
                placeholder="Password"
                type="password"
                className="w-full border-gray-300 border rounded-md py-2 px-10"
              />
            </div>
            <button className="py-2 rounded bg-accent-purple-500 font-bold text-white">
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
