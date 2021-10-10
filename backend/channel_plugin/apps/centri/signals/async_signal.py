from django.dispatch import Signal
import asyncio

# A marker for caching
NO_RECEIVERS = object()

class AsyncSignal(Signal):

    async def send(self, sender, **named):
        """
        Send signal from sender to all connected receivers.

        If any receiver raises an error, the error propagates back through send,
        terminating the dispatch loop. So it's possible that all receivers
        won't be called if an error is raised.

        Arguments:

            sender
                The sender of the signal. Either a specific object or None.

            named
                Named arguments which will be passed to receivers.

        Return a list of tuple pairs [(receiver, response), ... ].
        """
        if not self.receivers or self.sender_receivers_cache.get(sender) is NO_RECEIVERS:
            return []

        for receiver in self._live_receivers(sender):
            await receiver(signal=self, sender=sender, **named)


request_finished = AsyncSignal()
