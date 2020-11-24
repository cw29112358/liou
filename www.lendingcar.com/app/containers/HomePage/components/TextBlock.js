import React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

class TextBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const style = !isMobile ?
      { backgroundColor: '#eee', paddingRight: '8px' }
    : { backgroundColor: '#eee', paddingRight: '8px', paddingBottom: '0', paddingTop: '60px' };

    const msg0 = this.props.locale === 'zh' ?
     (<div className={isMobile ? 'hide' : 'row'}>
       <div className="col-sm-12  margin-b-30" >
         <p style={{ textAlign: 'left', color: '#000', fontSize: '20px', fontFamily: '微软雅黑' }}>
           我们的团队由经验丰富和值得信赖的专业人士组成，他们在IT和汽车租赁行业拥有多年的经验。在成立公司之前，我们已经是一个对客户和市场需求有完全了解的团队。这就是为什么我们能够以效率，信任，诚信，合作和协同的品质来保证我们的成功。我们重视打造一个团队合作的环境，并使我们的团队成为一个不分割的整体，并提供创新和高效的解决方案。我们以更好的价格和服务，为客户建立全面且优质的汽车租赁网络。无论您是商务旅行，自驾游，公路旅行，度假还是搬家，工作和学习，我们可以为您个性化订制租期并提供各种品牌和类型的汽车，以满足不同的客户需求。此外，我们还拥有玛莎拉蒂，林肯，兰博基尼等豪车品牌，无论您想要什么车，我们都能提供。无论是国际客户还是本地客户，LendingCar无疑已成为户最受欢迎的汽车租赁助手。
         </p>
       </div>
     </div>)
     :
     (<div className={isMobile ? 'hide' : 'row'}>
       <div className="col-sm-12  margin-b-30" >
         <p style={{ textAlign: 'left', color: '#000', fontSize: '20px' }}>
           Our team consists of seasoned and trustworthy professionals who have many years experience in IT and car leasing and rental industry. Before founding the company, we have already been a group of people who have a complete understanding about our clients needs and market requirements. That is why we can guarantee our success with our qualities of efficiency, trust, integrity, cooperation and collaboration. We value and create an environment of teamwork and collaboration so that our people can keep an undivided whole to provide innovative and efficient solutions.
         </p>
         <br />
         <p style={{ textAlign: 'left', color: '#000', fontSize: '20px' }}>
           We ensure our customer a better price rate with a better service. And we have established a comprehensive high-quality car leasing network for the customers. Whether the purpose of your trip is for business, road trip, vacation, or moving around, working and studying, we provide various brands and car types to satisfy the different requirement. Besides, we also have luxury car brands such as Maserati, Lincoln, Lamborghini, etc. LendingCar is the most popular leasing assistant for international, local and other type of customers.
         </p>
       </div>
     </div>);

    const msg1 = this.props.locale === 'zh' ?
      (<p style={{ textAlign: 'left', fontFamily: '微软雅黑' }}>
        省钱好帮手。最低$5.99/天平价优惠，就可以开启您的租约。我们一直以来希望能以最低的价格提供最好的服务。
      </p>)
      :
      (<p style={{ textAlign: 'left' }}>
        Save money. We always want to give you the best offer. Become our customer and enjoy the exclusive flat rate for the whole year. Lease cars from us with the starting price $5.99/day! We have our customer spend less but enjoy BETTER service.
      </p>);

    const msg2 = this.props.locale === 'zh' ?
      (<p style={{ textAlign: 'left', fontFamily: '微软雅黑' }}>
        探索新车型，享受驾驶不同汽车的乐趣。若您签订的租期满一年，您可以任性更换6次同级别的车辆，无需额外费用，尽情享受驾驶的新鲜感。
      </p>)
      :
      (<p style={{ textAlign: 'left' }}>
        Discover more wonders at no cost! We care about your driving experience, that&apos;s why we offer a fantastic leasing program for our customers who lease for a year, which is changing cars to the same class from our leasing pool for up to 6 times per year.
      </p>);

    const msg3 = this.props.locale === 'zh' ?
      (<p style={{ textAlign: 'left', fontFamily: '微软雅黑' }}>
        全方位服务。通过我们您可以尽情享受一周7天一天24小时的优质服务。我们可以提供一年两次免费道路救援和资深的保险咨询。在您需要我们的时候，LendingCar一直陪伴在您身边。
      </p>)
      :
      (<p style={{ textAlign: 'left' }}>
        Free road assistance for up to twice. LendingCar can help you 24/7 when you needs help. Once you join our leasing program, we offer our customers free road assistance up to two times and insurance consulting. We are ALWAYS here for you.
      </p>);

    const msg4 = this.props.locale === 'zh' ?
      (<p style={{ textAlign: 'left', fontFamily: '微软雅黑' }}>
        更多优惠，更多惊喜等您来拿。我们会定期为我们忠实的客户提供超值的优惠和折扣。免费更换机油、换位轮胎、四轮定位，全年享受维修车辆的巨额折扣。
      </p>)
      :
      (<p style={{ textAlign: 'left' }}>
        Spending less to have better service! Great deals are always available for our customers. Start leasing cars with us and get discounts on maintenance. Low price on oil change, tire rotation, AND MORE!
      </p>);

    return (
      <div className="split-section" style={style}>
        <div className="container margin-b-30" style={{ color: '#000' }} >
          {msg0}
          <div className="row" style={{ fontSize: '20px' }}>

            <div className="col-sm-3 margin-b-30">
              <div className="overflow-hidden " style={{ textAlign: 'center' }}>
                <h4 className="fa fa-dollar fa-2x" ></h4>
                {msg1}
              </div>
            </div>

            <div className="col-sm-3 margin-b-30">
              <div className="overflow-hidden" style={{ textAlign: 'center' }}>
                <h4 className="fa fa-exchange fa-2x"></h4>
                {msg2}
              </div>
            </div>

            <div className="col-sm-3 margin-b-30">
              <div className="overflow-hidden" style={{ textAlign: 'center' }}>
                <h4 className="fa fa-hand-stop-o fa-2x "></h4>
                {msg3}
              </div>
            </div>

            <div className="col-sm-3 margin-b-30">
              <div className="overflow-hidden" style={{ textAlign: 'center' }}>
                <h4 className="fa fa-gear fa-2x"></h4>
                {msg4}
              </div>
            </div>

          </div>
        </div>
      </div>


    );
  }
}

TextBlock.propTypes = {
  locale: PropTypes.string,
};

export default TextBlock;
