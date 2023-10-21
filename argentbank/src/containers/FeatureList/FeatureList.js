import Feature from '../../components/Feature/Feature';
import chatIcon from '../../assets/img/icon-chat.png';
import moneyIcon from '../../assets/img/icon-money.png';
import securityIcon from '../../assets/img/icon-security.png';
import './featurelist.css';

function FeatureList() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <Feature
        image={chatIcon}
        alt="chat icon"
        title="You are our #1 priority"
        content="Need to talk to a representative? You can get in touch through our
        24/7 chat or through a phone call in less than 5 minutes."
      />
      <Feature
        image={moneyIcon}
        alt="money icon"
        title="More savings means higher rates"
        content="The more you save with us, the higher your interest rate will be!"
      />
      <Feature
        image={securityIcon}
        alt="security icon"
        title="Security you can trust"
        content="We use top of the line encryption to make sure your data and money
        is always safe."
      />
    </section>
  );
}

export default FeatureList;
