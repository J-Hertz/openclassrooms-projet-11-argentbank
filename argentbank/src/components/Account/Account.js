import './account.css';

function Account(props) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{props.accountTitle}</h3>
        <p className="account-amount">{props.accountAmount}</p>
        <p className="account-amount-description">{props.accountAmountDesc}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default Account;
