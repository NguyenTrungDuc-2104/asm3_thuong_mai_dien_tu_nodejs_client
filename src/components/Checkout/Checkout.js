import { useEffect } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import Banner from "../../UI/Banner";
import styles from "./Checkout.module.css";
const Checkout = () => {
  const dataUser = useLoaderData();
  const navigate = useNavigate();
  const {
    value: nameInputValue,
    checkInput: nameInputCheck,
    hasError: nameInputError,
    valueChangeHandler: nameChangeValue,
    onBlurInputHandler: nameOnblurInput,
    setValueHandler: nameSetValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: emailInputValue,
    checkInput: emailnputCheck,
    hasError: emailInputError,
    valueChangeHandler: emailChangeValue,
    onBlurInputHandler: emailOnblurInput,
    setValueHandler: emailSetValue,
  } = useInput((value) => value.includes("@"));
  const {
    value: phoneInputValue,
    checkInput: phoneInputCheck,
    hasError: phoneInputError,
    valueChangeHandler: phoneChangeValue,
    onBlurInputHandler: phoneOnblurInput,
    setValueHandler: phoneSetValue,
  } = useInput((value) => value.trim().length === 10);
  const {
    value: addressInputValue,
    checkInput: addressInputCheck,
    hasError: addressInputError,
    valueChangeHandler: addressChangeValue,
    onBlurInputHandler: addressOnblurInput,
  } = useInput((value) => value.trim() !== "");
  //---------------------------set default value input----------------
  useEffect(() => {
    nameSetValue(dataUser.name);
    emailSetValue(dataUser.email);
    phoneSetValue("0" + dataUser.phoneNumber);
  }, [dataUser]);
  //---------------total---------------
  const total = dataUser.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  //------------------------------check input-------------------------
  const checkInput =
    emailnputCheck && nameInputCheck && phoneInputCheck && addressInputCheck;
  const submitHandler = (e) => {
    if (dataUser.cart.items.length === 0) {
      e.preventDefault();
      window.alert(
        "You do not have any products in your shopping cart, please go to the shop page to continue shopping"
      );
      return navigate("/shop/all");
    }
    if (!checkInput) {
      nameOnblurInput();
      emailOnblurInput();
      phoneOnblurInput();
      addressOnblurInput();
      return e.preventDefault();
    }
  };

  return (
    <section className={styles.container__checkout}>
      <Banner data={{ header: "CHECKOUT", text: "Checkout" }} />
      <h2>BILLING DETAILS</h2>

      <main className={styles.content__checkout}>
        <Form
          className={styles.form__checkout}
          method="POST"
          onSubmit={submitHandler}
        >
          <div className={styles.container__input}>
            <label htmlFor="name">FULL NAME:</label>
            <input
              id="name"
              name="name"
              placeholder="Enter Your Full Name Here!"
              type="text"
              value={nameInputValue}
              onChange={nameChangeValue}
              onBlur={nameOnblurInput}
              className={nameInputError ? styles.input__error : null}
            />
            {nameInputError && (
              <p className={styles.error__text}>Please enter your name</p>
            )}
          </div>

          <div className={styles.container__input}>
            <label htmlFor="email">EMAIL:</label>
            <input
              id="email"
              name="email"
              placeholder="Enter Your Email Here!"
              type="email"
              value={emailInputValue}
              onChange={emailChangeValue}
              onBlur={emailOnblurInput}
              className={emailInputError ? styles.input__error : null}
            />
            {emailInputError && (
              <p className={styles.error__text}>
                Email must include @ character
              </p>
            )}
          </div>

          <div className={styles.container__input}>
            <label htmlFor="phoneNumber">PHONE NUMBER:</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Your Phone Number Here!"
              type="number"
              value={phoneInputValue}
              onChange={phoneChangeValue}
              onBlur={phoneOnblurInput}
              className={phoneInputError ? styles.input__error : null}
            />
            {phoneInputError && (
              <p className={styles.error__text}>
                Please enter a 10 digit phone number
              </p>
            )}
          </div>

          <div className={styles.container__input}>
            <label htmlFor="address">ADDRESS</label>
            <input
              id="address"
              name="address"
              placeholder="Enter Your Address Here!"
              type="text"
              value={addressInputValue}
              onChange={addressChangeValue}
              onBlur={addressOnblurInput}
              className={addressInputError ? styles.input__error : null}
            />
            {addressInputError && (
              <p className={styles.error__text}>Please enter your address</p>
            )}
          </div>
          <input type="number" name="total" value={total} hidden readOnly />
          <button className={styles.btn__form}>Place order</button>
        </Form>

        <div className={styles.container__total}>
          <p>YOUR ORDER</p>
          {dataUser.cart &&
            dataUser.cart.items.map((item) => {
              const price = item.product.price.toLocaleString();
              return (
                <div key={item._id} className={styles.product}>
                  <p>{item.product.name}</p>
                  <p>
                    {price} VND x{item.quantity}
                  </p>
                </div>
              );
            })}
          <div className={styles.total}>
            <p>TOTAL</p>
            <p>{total.toLocaleString()} VND</p>
          </div>
        </div>
      </main>
    </section>
  );
};
export default Checkout;
