/**
 * Port Node Path Utils For KISSY.
 * Note: Only posix mode.
 * @author yiminghe@gmail.com
 */
(function (S) {

    /**
     * @namespace Path
     * @memberOf KISSY
     */
    var Path = {},
    // [root, dir, basename, ext]
        splitPathRe = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;

    KISSY.Path = Path;

    function splitPath(filename) {
        var m = filename.match(splitPathRe) || [];
        return [m[1] || "", m[2] || "", m[3] || "", m[4] || ""];
    }

    /**
     * Remove .. and . in path array
     * @param parts
     * @param allowAboveRoot
     * @return {*}
     */
    function normalizeArray(parts, allowAboveRoot) {
        // level above root
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last == ".") {
                parts.splice(i, 1);
            } else if (last === "..") {
                parts.splice(i, 1);
                up++;
            } else if (up) {
                parts.splice(i, 1);
                up--;
            }
        }

        // if allow above root, has to add ..
        if (allowAboveRoot) {
            for (; up--; up) {
                parts.unshift("..");
            }
        }

        return parts;
    }

    S.mix(Path,
        /**
         * @lends KISSY.Path
         */
        {

            /**
             * resolve([from ...], to)
             * @return {String} Resolved path.
             */
            resolve:function () {

                var resolvedPath = [],
                    resolvedPathStr,
                    i,
                    args = S.makeArray(arguments),
                    path,
                    absolute = 0;

                for (i = args.length - 1; i >= 0 && !absolute; i--) {
                    path = args[i];
                    if (typeof path != "string" || !path) {
                        continue;
                    }
                    resolvedPath.unshift(path);
                    absolute = path.charAt(0) == "/";
                }

                resolvedPathStr = normalizeArray(resolvedPath, !absolute).join("/");

                return (absolute ? "/" : "" + resolvedPathStr) || ".";

            },

            /**
             * normalize .. and . in path
             * @param {String} path Path tobe normalized
             * @example
             * <code>
             * "x/y/../z" => "x/z"
             * "x/y/z/../" => "x/y/"
             * </code>
             * @return {String}
             */
            normalize:function (path) {
                var absolute = path.charAt(0) == "/",
                    trailingSlash = path.slice(-1) == "/";

                path = normalizeArray(S.filter(path.split("/"), function (p) {
                    return !!p;
                }), !absolute).join("/");

                if (!path && !absolute) {
                    path = ".";
                }

                if (path && trailingSlash) {
                    path += "/";
                }


                return (absolute ? "/" : "") + path;
            },

            /**
             * join([path ...]) and normalize
             * @return {String}
             */
            join:function () {
                var args = S.makeArray(arguments);
                return Path.normalize(S.filter(args,function (p) {
                    return p && (typeof p == "string");
                }).join("/"));
            },

            /**
             * Get string which is to relative to from
             * @param {String} from
             * @param {String} to
             * @example
             * <code>
             * relative("x/","x/y/z") => "y/z"
             * relative("x/t/z","x/") => "../../"
             * </code>
             * @return {String}
             */
            relative:function (from, to) {
                from = Path.resolve(from);
                to = Path.resolve(to);

                var fromParts = S.filter(from.split("/"), function (p) {
                        return !!p;
                    }),
                    path = [],
                    sameIndex,
                    sameIndex2,
                    toParts = S.filter(to.split("/"), function (p) {
                        return !!p;
                    }), commonLength = Math.min(fromParts.length, toParts.length);

                for (sameIndex = 0; sameIndex < commonLength; sameIndex++) {
                    if (fromParts[sameIndex] != toParts[sameIndex]) {
                        break;
                    }
                }

                sameIndex2 = sameIndex;

                while (sameIndex < fromParts.length) {
                    path.push("..");
                    sameIndex++;
                }

                path = path.concat(toParts.slice(sameIndex2));

                path = path.join("/");

                return path;

            }

        });

})(KISSY);
/**
 * Refer
 *  - https://github.com/joyent/node/blob/master/lib/path.js
 */