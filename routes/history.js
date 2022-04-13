const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const historyService = require('../service/historyService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      date: req.body.date,
      productsAll: req.body.productsAll,
      productsGood: req.body.productsGood,
      productsError: req.body.productsError,
      remarks: req.body.remarks,
      startAt: req.body.startAt,
      endAt: req.body.endAt,
    };
    logger.info(`(history.reg.params) ${JSON.stringify(params)}`);

    // // 입력값 null 체크
    // if (!params.xcoordinate) {
    //   const err = new Error('Not allowed null (xcoordinate)');
    //   logger.error(err.toString());

    //   res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await historyService.reg(params);
    logger.info(`(history.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      id: req.query.id,
    };
    logger.info(`(history.list.params) ${JSON.stringify(params)}`);

    const result = await historyService.list(params);
    logger.info(`(history.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// // 상세정보 조회
// router.get('/:id', async (req, res) => {
//   try {
//     const params = {
//       id: req.params.id,
//     };
//     logger.info(`(dashboard.info.params) ${JSON.stringify(params)}`);

//     const result = await dashboardService.info(params);
//     logger.info(`(dashboard.info.result) ${JSON.stringify(result)}`);

//     // 최종 응답
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

// // 수정
// router.put('/:id', async (req, res) => {
//   try {
//     const params = {
//       xcoordinate: req.body.xcoordinate,
//       ycoordinate: req.body.ycoordinate,
//       dayoutput: req.body.dayoutput,
//       errorpercent: req.body.errorpercent,
//       dicenum: req.body.dicenum,
//       time: req.body.time,
//       start: req.body.start,
//       end: req.body.end,
//       errorproducts: req.body.errorproducts,
//       goodproducts: req.body.goodproducts,
//       oddnum: req.body.oddnum,
//       evennum: req.body.evennum,
//     };
//     logger.info(`(dashboard.update.params) ${JSON.stringify(params)}`);

//     const result = await dashboardService.edit(params);
//     logger.info(`(dashboard.update.result) ${JSON.stringify(result)}`);

//     // 최종 응답
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

// // 삭제
// router.delete('/:id', async (req, res) => {
//   try {
//     const params = {
//       id: req.params.id,
//     };
//     logger.info(`(dashboard.delete.params) ${JSON.stringify(params)}`);

//     const result = await dashboardService.delete(params);
//     logger.info(`(dashboard.delete.result) ${JSON.stringify(result)}`);

//     // 최종 응답
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({ err: err.toString() });
//   }
// });

module.exports = router;
