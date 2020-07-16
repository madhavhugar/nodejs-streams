## Nodejs Streams

### Copying files

Copying a large file can be quite heavy on the memory of the system. Using streams can dodge `out of memory` issues.

 - [Copying a file using streams](scripts/naiveFileCopyUsingStreams.ts)

 Using streams is helpful but nodejs offers something better (which also works on top of streams). When copying a large file using the above approach you would still be using quite a lot of memory, that would most likely be because your file read speed would be faster than your file write speed. So we need a mechanism that notifies the reader to slow down when the writer is not able to cope up. Nodejs offers us a `pipe` method on the streams that applies `automatic back pressure`. What `automatic back pressure` basically means is that we would have a broker in between the reader and writer that would help coordinate each other's speed.

 - [Copying a file using streams using pipe](scripts/backPressuredFileCopy.ts)
