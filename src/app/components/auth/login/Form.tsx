import Button from "@/app/components/page/Button";

export default function Form() {
  return (
    <form className="space-y-3">
      <div className="space-y-3">
        {/* email */}
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="form__input"
        />
        {/* password */}
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="form__input"
        />
      </div>
      {/* submit */}
      <Button type="submit" className="w-full">
        <span className="form__submit-btn__p">Log in</span>
      </Button>
    </form>
  );
}
