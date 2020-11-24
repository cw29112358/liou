// /**
// *
// * InstallmentPayment Stateless Component
// *
// */
//
// /* global translate */
//
// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   View,
//   Text,
// } from 'native-base';
//
// import ScrollRuler from 'components/ScrollRuler';
// import TranslateText from 'components/TranslateText';
//
// import AprList from '../AprList';
//
// import styles from './styles';
//
// const InstallmentPayment = (props) => {
//   const {
//     depositFinance, setInterestRate, setPercentage, changeIsScroll,
//   } = props;
//   const {
//     percentage, interestRate, downPayment, prepaid, monthlyPayment,
//   } = depositFinance;
//
//   const renderHeader = () => (
//     <View style={styles.titleLine}>
//       <View style={styles.titleView}>
//         <View style={styles.horizontalLine}></View>
//         <TranslateText label="paymentPlan" style={styles.title} />
//       </View>
//     </View>
//   );
//   const renderAPR = () => (
//     <AprList
//       setInterestRate={setInterestRate}
//       interestRate={interestRate}
//     />
//   );
//   const renderPaymentCard = () => {
//     const list = [
//       {
//         label: 'installmentDownPayment',
//         value: downPayment,
//       },
//       {
//         label: 'interestDeposit',
//         value: prepaid,
//       },
//       {
//         label: 'interestDepositMothly',
//         value: monthlyPayment,
//       },
//     ];
//
//     return (
//       <View style={styles.planCard}>
//         {
//           list.map((item, index) => (
//             <View style={styles.downPayment} key={item.label}>
//               <Text style={styles.paymentLabel}>{translate(item.label)}</Text>
//               {translate(item.value, 'dollar', styles.priceStyle)}
//
//               <Text style={styles.currentPercentage}>
//                 {index === 0 && `( ${percentage * 100}% )`}
//               </Text>
//             </View>
//           ))
//         }
//       </View>
//     );
//   };
//   const renderDepositText = () => (
//     <View style={styles.depositView}>
//       <Text>
//         <TranslateText label="depositNoteText" style={styles.depositNote} />
//         {translate(downPayment + prepaid, 'dollar', styles.depositPrice)}
//       </Text>
//       <Text style={styles.depositNote}>
//         (&nbsp;<TranslateText label="installmentDownPayment" returnNode={false} />&nbsp;
//         {translate(downPayment, 'dollar', styles.depositPrice)}&nbsp;+&nbsp;
//         <TranslateText label="interestDeposit" returnNode={false} />&nbsp;
//         {translate(prepaid, 'dollar', styles.depositPrice)}&nbsp;)
//       </Text>
//     </View>
//   );
//
//   return (
//     <View style={styles.content}>
//       { renderHeader() }
//       { renderAPR() }
//       <View style={styles.detailContent}>
//         {/* <Text style={styles.membershipsNote}>{translate('installmentPaymentNote')}</Text> */}
//         { renderPaymentCard() }
//         <ScrollRuler
//           slideWidth={styles.slideLength}
//           getPaymentData={setPercentage}
//           changeIsScroll={changeIsScroll}
//         />
//         { renderDepositText() }
//       </View>
//     </View>
//   );
// };
//
// InstallmentPayment.defaultProps = {
//   depositFinance: {},
//   setInterestRate: () => null,
//   setPercentage: () => null,
//   changeIsScroll: () => null,
// };
//
// InstallmentPayment.propTypes = {
//   depositFinance: PropTypes.object,
//   setInterestRate: PropTypes.func,
//   setPercentage: PropTypes.func,
//   changeIsScroll: PropTypes.func,
// };
//
// export default InstallmentPayment;
