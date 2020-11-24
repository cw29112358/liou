/**
*
* Step
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.scss';
import '../style.scss';

const stepArray = ['1.Driver Details', '2.Confirm and Pay', '3.Contract'];

function Step(props) {
  const { fields, onChangeStep } = props;
  const stepNumber = fields.get(0);
  const completedStepNumber = fields.get(1);
  return (
    <ul className="stepTab col-sm-12">
      {
          stepArray.map((title, key) => {
            const correctedKeyNumber = key + 1;
            const isCurrentStep = correctedKeyNumber === stepNumber;
            const isCompletedStep = (correctedKeyNumber !== stepNumber) && (correctedKeyNumber <= completedStepNumber);
            const isDisabledStep = !isCurrentStep && !isCompletedStep;
            const tabClassName = classNames({
              'btn-step': true,
              currentStep: isCurrentStep,
              completedStep: isCompletedStep,
              disabledStep: isDisabledStep,
              textOverflow: true,
            });
            const listClassName = classNames({
              stepList: true,
              'col-sm-3': true,
              'col-xs-6': true,
              'text-center': true,
              disabled: isDisabledStep,
            });
            const onClick = () => {
              if (!isDisabledStep) {
                const savedValues = {
                  [fields.name]: [correctedKeyNumber, completedStepNumber],
                };
                onChangeStep(savedValues);
              }
            };
            return (
              <li className={listClassName} key={key} >
                <a className={tabClassName} role="button" onClick={onClick}>
                  <span className="number">{title}</span>
                </a>
                <br></br>
                <br></br>
              </li>
            );
          })
        }
    </ul>
  );
}

Step.propTypes = {
  fields: PropTypes.object,
  onChangeStep: PropTypes.func,
};

export default Step;

// <div className="stepwizard">
//   <div className="stepwizard-row setup-panel">
//     {
//     stepArray.map((title, key) => {
//       const correctedKeyNumber = key + 1;
//       const isCurrentStep = correctedKeyNumber === stepNumber;
//       const isCompletedStep = correctedKeyNumber <= completedStepNumber;
//       const className = isCurrentStep ? 'btn btn-current-step btn-circle' : 'btn btn-other-step btn-circle';
//       const disabled = isCompletedStep ? '' : 'disabled';
//       // const onChange = (index) => {
//       //   handleSubmit(() => {
//       //     const savedValues = fromJS({
//       //       [fields.name]: [index, completedStepNumber],
//       //     });
//       //     onSubmit(savedValues, null, props);
//       //   })();
//       // };
//       const onClick = disabled ? null : onChangeStep.bind(this, correctedKeyNumber);
//       return (
//         <div className="stepwizard-step col-md-3" key={key}>
//           <a role="button" className={className} onClick={onClick} disabled={disabled}>
//             {correctedKeyNumber}
//           </a>
//           <div>{title}</div>
//           <br></br>
//           <br></br>
//         </div>
//       );
//     })
//   }
//   </div>
// </div>
