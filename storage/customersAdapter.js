"use strict";
function adapt(item) {
  return Object.assign(item, {
    customerId: +item.customerId
  });
}
module.exports = { adapt };
