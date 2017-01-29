/**
 * Created by demongao on 2017/1/27.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
/***
 *
 * @param page 当前页数
 * @param pageSize 每页条数
 * @param Model
 * @param populate 关联查询
 * @param queryParams 查询条件Object
 * @param sortParams 排序条件
 * @param callback
 */
var pageQuery = function (page, pageSize, Model, populate, queryParams, sortParams, callback) {
    pageSize = parseInt(pageSize);
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    };
    async.parallel({
        count: function (done) {  // 查询数量
            Model
                .count(queryParams)
                .exec(function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {   // 查询一页的记录
            Model
                .find(queryParams)
                .skip(start)
                .limit(pageSize)
                .populate(populate)
                .sort(sortParams)
                .exec(function (err, doc) {
                    done(err, doc);
                });
        }
    }, function (err, results) {
        console.log(results);
        var count = results.count;
        $page.pageCount = Math.ceil(count / pageSize);   //共多少页
        $page.total = count;                             //共多少条
        $page.results = results.records;
        callback(err, $page);
    });
};

module.exports = {
    pageQuery: pageQuery
};