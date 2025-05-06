import Button from "@/app/components/page/Button";

export default function Form() {
  return (
    <form className="space-y-3">
      {/* name */}
      <div>
        <label className="form__label">Name</label>
        <input
          id="signup-name"
          name="name"
          type="text"
          placeholder="Name"
          className="form__input"
        />
      </div>
      {/* last name */}
      <div>
        <label className="form__label">Last Name</label>
        <input
          id="signup-lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          className="form__input"
        />
      </div>
      {/* email */}
      <div>
        <label className="form__label">Email</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          placeholder="Email"
          className="form__input"
        />
      </div>
      {/* password */}
      <div>
        <label className="form__label">Password</label>
        <input
          id="signup-password"
          name="password"
          type="password"
          placeholder="Password"
          className="form__input"
        />
      </div>
      {/* confirm password */}
      <div>
        <label className="form__label">Confirm Password</label>
        <input
          id="signup-confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="form__input"
        />
      </div>
      {/* submit */}
      <Button type="submit" className="w-full">
        <span className="form__submit-btn__p">Sign up</span>
      </Button>
    </form>
  );
}
