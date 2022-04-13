const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const historyService = require('../service/historyService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      history_id: req.body.history_id,
      date: req.body.date,
      products_all: req.body.products_all,
      products_good: req.body.products_good,
      products_error: req.body.products_error,
      start_at: req.body.start_at,
      start: req.body.start,
      end_at: req.body.end_at,
      userid: req.body.userid,
      remarks: req.body.remarks,

    };
    logger.info(`(history.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.xcoordinate) {
      const err = new Error('Not allowed null (xcoordinate)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await historyService.reg(params);
    logger.info(`(dashboard.reg.result) ${JSON.stringify(result)}`);

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
    logger.info(`(dashboard.list.params) ${JSON.stringify(params)}`);

    const result = await historyService.list(params);
    logger.info(`(dashboard.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(dashboard.info.params) ${JSON.stringify(params)}`);

    const result = await historyService.info(params);
    logger.info(`(dashboard.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      history_id: req.body.history_id,
      date: req.body.date,
      products_all: req.body.products_all,
      products_good: req.body.products_good,
      products_error: req.body.products_error,
      start_at: req.body.start_at,
      start: req.body.start,
      end_at: req.body.end_at,
      userid: req.body.userid,
      remarks: req.body.remarks,

    };
    logger.info(`(dashboard.update.params) ${JSON.stringify(params)}`);

    const result = await historyService.edit(params);
    logger.info(`(dashboard.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(dashboard.delete.params) ${JSON.stringify(params)}`);

    const result = await historyService.delete(params);
    logger.info(`(dashboard.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
