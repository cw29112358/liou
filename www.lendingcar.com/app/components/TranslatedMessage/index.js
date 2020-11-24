/**
*
* TranslatedMessage
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';

function TranslatedMessage(props) {
  const { messages, messageId = '', tagName, children } = props;
  if (messages[messageId]) {
    return (
      <FormattedMessage {...messages[messageId]} tagName={tagName} >
        {children}
      </FormattedMessage>
    );
  }
  if (messageId.length > 40) { // Notes: this message is a long sentance
    return <span>{messageId}</span>;
  }
  return <span>{_.startCase(messageId)}</span>;
}

TranslatedMessage.propTypes = {
  children: PropTypes.node,
  messageId: PropTypes.string,
  messages: PropTypes.object,
  tagName: PropTypes.string,
};

export default TranslatedMessage;

export const formatMessage = (intl, messages, messageId) => {
  const key = _.camelCase(messageId);
  const currentMessage = messages[key];
  if (currentMessage) return intl.formatMessage(currentMessage);

  console.warn('formatMessage is missing:', key);
  return messageId;
};
