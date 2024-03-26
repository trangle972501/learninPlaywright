
function getEnv() {
  if (process.env.ENV) {
    require('dotenv').config({ 
      override: true,
      path: `src/helper/env/.env.${process.env.ENV}` })
  }
  else {
    console.error("NO ENV PASSED!")
  }
}

exports.getEnv = getEnv;